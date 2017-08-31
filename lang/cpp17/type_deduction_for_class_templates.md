# クラステンプレートのテンプレート引数推論
* cpp17[meta cpp]

## 概要
コンストラクタに渡される値によって、クラステンプレートのテンプレート引数を推論する。

```cpp
// std::vectorクラステンプレートのテンプレート引数を省略。
// 初期化時に代入される初期化子リストの要素型が、std::vectorの要素型となる
std::vector v = {1, 2, 3}; // 変数vの型はstd::vector<int>
```

単純なケースでは、コンストラクタで受け取る値の型がクラスのテンプレートパラメータである場合に、クラスのテンプレート引数が推論される。

```cpp
template <class T>
struct Point {
  T x, y;

  // コンストラクタは、クラスのテンプレートパラメータT型のパラメータをとる
  Point(T x_, T y_)
    : x(x_), y(y_) {}
};

int main()
{
  Point p {1.0f, 3.0f}; // 変数pの型はPoint<float>に推論される
  Point q {1.0, 3.0};   // 変数qの型はPoint<double>に推論される
}
```

より複雑な例として、コンストラクタがクラスのテンプレートパラメータ型の値を直接受け取らない場合は、「推論補助 (deduction guide)」をクラス外に記述する。

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <iterator>

namespace mine {

// std::vectorをラップした可変長配列クラス
template <class T>
class MyVector {
  std::vector<T> data_;

public:
  // コンストラクタではクラステンプレートパラメータTを直接使用せず、
  // イテレータ範囲で初期化する
  template <class InputIterator>
  MyVector(InputIterator first, InputIterator last)
    : data_(first, last) {}

  void print()
  {
    for (const T& x : data_) {
      std::cout << x << std::endl;
    }
  }
};

// 推論補助宣言。クラスが所属する名前空間の、クラス外に記述する。
// イテレータの要素型をMyVectorのテンプレート引数として使用する。
template <class InputIterator>
MyVector(InputIterator, InputIterator)
  -> MyVector<typename std::iterator_traits<InputIterator>::value_type>;

} // namespace mine

int main()
{
  std::list ls = {1, 2, 3};

  // 変数vの型はmine::MyVector<int>に推論される
  mine::MyVector v {ls.begin(), ls.end()};

  v.print(); // 1, 2, 3が順に出力される
}
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

コンストラクタのパラメータ型から、直接あるいは間接的にクラステンプレートの引数を求められない場合は、推論できない。


## 仕様
- クラステンプレートのコンストラクタが、パラメータにクラスのテンプレートパラメータをとる場合、コンストラクタの引数からクラステンプレートのテンプレート引数を推論できる
- クラスのテンプレート引数を推論できる場合、そのクラステンプレートを使用するユーザーコードは、テンプレート引数を省略できる：
    ```cpp
    template <class T>
    struct AnyValue {
      T x;

      // コンストラクタがパラメータとして
      // クラステンプレートのテンプレートパラメータ型の
      // オブジェクトを受け取る。
      // この状況では、コンストラクタの引数からクラスの
      // テンプレート引数を推論できる
      AnyValue(T x_) : x(x_) {}
    };

    AnyValue<int> v {3}; // 型推論しない従来の書き方
    AnyValue w {3};      // 型推論してテンプレート引数を省略。wの型はAnyValue<int>
    ```

- テンプレート引数を省略したクラステンプレート名は、プレースホルダーとして扱われる。型推論の結果として、テンプレート引数を補完した完全な型名に置き換えられる
- コンストラクタのパラメータ型からクラステンプレート引数を直接推論できない場合、「推論補助 (duduction guide)」を宣言する。推論補助は、クラス外のクラスと同じスコープ、同じアクセス修飾内に宣言する。構文は、以下のようになる：
    ```cpp
    クラステンプレート名(パラメータリスト) -> クラステンプレート名<テンプレート引数>;

    // -> のうしろは、推論結果としての完全な型名
    ```

- 推論補助宣言は、パラメータにデフォルト引数を持ってはならない
- 同じ翻訳単位に2つの推論補助がある場合、それらの推論補助は、同じパラメータリストを持ってはならない
- 推論補助には、先頭に`explicit`を任意に付けられる。しかし、`noexcept`や属性といった修飾は付けられない
- コンストラクタの引数を、コンストラクタに渡される前の状態 (配列からポインタへの変換などが行われる前の状態) で推論補助に転送したとして推論が行われる。そのため、推論補助はクラスのコンストラクタと同一のシグニチャである必要はない


## 例
### 標準ライブラリでの使用例
```cpp
#include <vector>
#include <array>
#include <set>
#include <complex>
#include <functional>
#include <memory>
#include <utility>
#include <future>
#include <mutex>

int main()
{
  // 初期化子リストからコンテナの要素型を推論
  {
    std::vector v = {1, 2, 3}; // std::vector<int>に推論される
    std::array ar = {4, 5, 6}; // std::array<int, 3>に推論される
    std::set s = {7, 8, 9};    // std::set<int>に推論される
  }

  // 複素数の要素型を推論
  {
    std::complex c {1.0, 2.0};    // std::complex<double>に推論される
    std::complex cf {1.0f, 2.0f}; // std::complex<float>に推論される
  }

  // 関数ポインタ・関数オブジェクトからstd::functionのシグニチャを推論
  {
    // std::function<int(int, double)>に推論される
    std::function f = [](int, double) { return 0; };
  }

  // スマートポインタの型推論
  {
    // std::shared_ptrとstd::unique_ptrは生ポインタからの推論を許可しない。
    // std::shared_ptrからstd::weak_ptrとその逆は推論できる
    std::shared_ptr<int> sp {new int(3)};
    std::weak_ptr wp = sp;
    std::shared_ptr locked_sp = wp.lock();
  }

  // std::pairとstd::tupleの型推論
  {
    // std::make_pair()やstd::make_tuple()のような単純な生成関数が不要となる例
    std::pair p {1, "Hello"};        // std::pair<int, const char*>に推論される
    std::tuple t {1, 3.14, "Hello"}; // std::tuple<int, double, const char*>に推論される
  }

  // std::lock_guardが管理するミューテックスの型を推論
  {
    std::mutex mut;
    std::lock_guard lk {mut}; // std::lock_guard<std::mutex>に推論される
  }

  // promiseから取得するfutureで、結果型を推論
  {
    // std::future<int>に推論される
    std::promise<int> pro;
    std::future fut = pro.get_future();
  }
}
```
* std::complex[link /reference/complex.md]
* std::function[link /reference/functional/function.md]
* std::weak_ptr[link /reference/memory/weak_ptr.md]
* wp.lock()[link /reference/memory/weak_ptr/lock.md]
* std::tuple[link /reference/tuple/tuple.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* std::future[link /reference/future/future.md]

#### 出力
```
```


## この機能が必要になった背景・経緯

この機能は、以下のような問題を解決するために導入された：

- `make_*()`のような生成関数は、冗長で、かつ標準ライブラリの非クラステンプレートの構築方法と一貫性がなかった
- 生成関数の設計が標準ライブラリ内で一貫しておらず、[`std::make_pair()`](/reference/utility/make_pair.md)や[`make_tuple()`](/reference/tuple/make_tuple.md)といった`make_`接頭辞が付く場合もあれば、[`std::back_insert_iterator`](/reference/iterator/back_insert_iterator.md)に対する[`std::back_inserter()`](/reference/iterator/back_inserter.md)関数のように、`make_`接頭辞が付かない場合があった。そのために、ユーザーは生成関数の細かな違いをドキュメントで調べながら使用する必要があった
- 関数テンプレートでは引数の型からテンプレートパラメータの型を推論できるにも関わらず、クラステンプレートのコンストラクタでは`pair<int, double>(2, 4.5)`の`<int, double>`のように冗長な指定をする必要があった
- 生成関数は、単に引数の型を推論するだけではない場合があった。例として、[`std::make_pair()`](/reference/utility/make_pair.md)や[`make_tuple()`](/reference/tuple/make_tuple.md)といった関数は、型が[`std::reference_wrapper<T>`](/reference/functional/reference_wrapper.md)であった場合に、それを`T&`に展開する機能がある。単に引数の型を推論するだけの生成関数なのか、より複雑なことをする生成関数なのかをドキュメントで調査する必要があり、そうしない場合に予期せぬバグが発生することがあった
- 生成関数を持たない場合、たとえばラムダ式を使用する際に、その型を記述できない問題があった
- [`std::lock_guard`](/reference/mutex/lock_guard.md)のようにコピーもムーブもできない型は、生成関数を作るために「[コピー省略](guarantee_copy_elision.md.nolink)」のような難解な機能を使用する必要があった
- 循環的な複雑さ (Cyclomatic complexity) を軽減するために大きな関数をクラスで置き換える便利な手法が、関数テンプレートでは使用できなかった


## 関連項目
- [`std::pair`の推論補助](/reference/utility/pair/op_deduction_guide.md)
- [`std::tuple`の推論補助](/reference/tuple/tuple/op_deduction_guide.md)
    - `std::pair`と`std::tuple`の推論補助の例からは、[`std::make_pair()`](/reference/utility/make_pair.md)のような生成関数の必要性が薄くなることと、標準ライブラリ内の生成関数と推論補助で、小さな機能的差異があることがわかる
- [`std::shared_ptr`の推論補助](/reference/memory/shared_ptr/op_deduction_guide.md)
    - `std::shared_ptr`は、生ポインタからの推論を許可しない。`std::shared_ptr`には単一要素版と配列版があるが、生ポインタの値と型からは、どちらに振り分けるべきかが定まらないためである
- [`std::array`の推論補助](/reference/array/op_deduction_guide.md)
    - `std::array`の推論補助からは、非自明なコンストラクタを持たないクラステンプレートであっても、推論補助を定義できることがわかる。ただし、配列の要素型を推論するためには、推論しない場合とは違った制限が必要となる


## 参照
- [P0091R3 Template argument deduction for class templates (Rev. 6)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0091r3.html)
- [P0620R0 Drafting for class template argument deduction issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0620r0.html)
- [LWG Issue 2981. Remove redundant deduction guides from standard library](https://wg21.cmeerw.net/lwg/issue2981)
