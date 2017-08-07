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
- 推論補助には、`explicit`や`noexcept`といった修飾は記述できない
- コンストラクタの引数を推論補助に転送したとして推論が行われる。そのため、推論補助はクラスのコンストラクタと同一のシグニチャである必要はない


## 例
```cpp
```

### 出力
```
```


## 関連項目
- [`std::pair`の推論補助](/reference/utility/pair/op_deduction_guide.md)
- [`std::tuple`の推論補助](/reference/tuple/tuple/op_deduction_guide.md)
    - `std::pair`と`std::tuple`の推論補助の例からは、[`std::make_pair()`](/reference/utility/make_pair.md)のようなヘルパ関数の必要性が薄くなることと、標準ライブラリ内のヘルパ関数と推論補助で、小さな機能的差異があることがわかる
- [`std::array`の推論補助](/reference/array/op_deduction_guide.md)
    - `std::array`の推論補助からは、非自明なコンストラクタを持たないクラステンプレートであっても、推論補助を定義できることがわかる。ただし、配列の要素型を推論するためには、推論しない場合とは違った制限が必要となる


## 参照
- [P0091R3 Template argument deduction for class templates (Rev. 6)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0091r3.html)
- [P0620R0 Drafting for class template argument deduction issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0620r0.html)
