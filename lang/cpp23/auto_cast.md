# auto(x)による一時オブジェクトへの変換 [P0849R8]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、`auto(expr)`および`auto{expr}`によって、式`expr`の値をコピーした一時オブジェクトを取得できる。

```cpp
void f(std::vector<int>& v)
{
  // v.front()のコピーを、一時オブジェクトとしてg()に渡す
  g(auto(v.front()));
}
```

コピーを作るだけであれば`auto a = v.front();`のように変数宣言でもよいが、この場合はコピーであることが宣言の副次的な性質にすぎず、得られる`a`も左辺値である。`auto(...)`は「値をコピーする」という操作を式として直接表現でき、その結果は関数へ値渡しした場合と同じprvalue (一時オブジェクト) となる。


## 仕様
`auto(expr)`と`auto{expr}`は、関数記法による明示的型変換 (`T(expr)`、`T{expr}`) の`T`を`auto`にしたものである。この`auto`は、以下の宣言で変数`x`に推論される型で置き換えられる。

```cpp
auto x init;  // initは初期化子 (expr) もしくは {expr}
```
* init[italic]

結果の型は、`expr`の型から参照とCV修飾を外し、配列型は要素へのポインタ、関数型は関数へのポインタへ変換した型となる。結果の値カテゴリはprvalueである。

```cpp
int x = 0;
const int& r = x;
int a[3]{};

auto(r);  // int型のprvalue
auto(a);  // int*型のprvalue
auto{x};  // int型のprvalue。auto(x)と同じ
```

- `auto()`のように初期化子が空の場合と、`auto{a, b}`のように要素が2つ以上ある場合は型を推論できないため、不適格となる
- 文の先頭に書いた`auto(x);`は、キャストではなく変数宣言`auto x;`として解釈される。式として評価する場合は`(void)auto(x);`のように書く
- `decltype(auto(expr))`は、多くの場合[`std::decay_t`](/reference/type_traits/decay.md)`<decltype(expr)>`と同じ型になる。ただし[`std::decay_t`](/reference/type_traits/decay.md)は型を変換するだけであり、`expr`を実際にコピーできるかどうかは考慮しない。そのため、`expr`がムーブしかできない型の左辺値である場合、[`std::decay_t`](/reference/type_traits/decay.md)はその型になるのに対し、`auto(expr)`はコピーコンストラクタを呼び出せないため不適格となる
    ```cpp
    std::unique_ptr<char> p = std::make_unique<char>();

    // 型を変換するだけなので、unique_ptr<char>が得られる
    static_assert(std::is_same_v<std::decay_t<decltype(p)>, std::unique_ptr<char>>);

    auto a = auto(p);            // コンパイルエラー！ pはコピーできない
    auto b = auto(std::move(p)); // OK。ムーブされる
    ```
    * std::make_unique[link /reference/memory/make_unique.md]
    * std::move[link /reference/utility/move.md]

この機能にともなって、標準ライブラリ規定でコピーを表していた説明専用の[`decay-copy`](/reference/exposition-only/decay-copy.md)関数も、[`std::ranges::begin`](/reference/ranges/begin.md)などの多くの箇所で`auto(...)`へ置き換えられた。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <type_traits>

int main()
{
  int x = 1;
  const int& r = x;
  int a[3] = {1, 2, 3};

  // 参照とconstが外れたコピーが、prvalueとして得られる
  static_assert(std::is_same_v<decltype(auto(r)), int>);

  // 配列はポインタへ変換される
  static_assert(std::is_same_v<decltype(auto(a)), int*>);

  std::cout << auto(x) << std::endl;
}
```

### 出力
```
1
```

### 比較対象をコピーして渡す
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 1, 3, 1};

  // std::remove()は、残す要素を前方に詰めるために要素を上書きしていく。
  // 比較対象としてv.front()を渡すと、パラメータが参照であるために先頭要素の
  // 上書きが比較対象の値にも波及し、意図しない結果になる。
  // auto()でコピーを渡すことで、比較対象の値を固定できる
  v.erase(std::remove(v.begin(), v.end(), auto(v.front())), v.end());

  for (int x : v) {
    std::cout << x;
  }
  std::cout << std::endl;
}
```

### 出力
```
23
```


## この機能が必要になった背景・経緯
標準ライブラリの規定では、コピーを作ることを表すために説明専用の[`decay-copy`](/reference/exposition-only/decay-copy.md)関数が使われていた。しかし、これと同じことをユーザーコードで書こうとすると、テンプレート・完全転送・`noexcept`指定・型特性を組み合わせた以下のような定義が必要になる。

```cpp
template <class T>
constexpr std::decay_t<T> decay_copy(T&& v)
  noexcept(std::is_nothrow_convertible_v<T, std::decay_t<T>>)
{
  return std::forward<T>(v);
}
```

この方法には、以下の問題もあった。

- `decay_copy(expr)`は、`expr`がすでにprvalueであっても、常にコピーを作ってしまう
- `decay_copy`はどのクラスの`friend`でもないため、コピーコンストラクタが`private`や`protected`であるクラスのメンバ関数からは呼び出せない。`auto(*this)`であれば呼び出せる

コピーする型`T`を書けるのであれば`T(expr)`と書けばよいが、`T`を求めるのが難しい場合には`std::decay_t<decltype(expr)>(expr)`のように書く必要があり、意図が読み取りにくかった。

また、変数宣言の`auto v(x);`とnew式の`new auto(x)`では`auto`を使えたのに対し、関数記法のキャストだけが対応していなかった。この機能によって、これらの記法の一貫性も改善された。


## 検討されたほかの選択肢
- `decltype(auto){x}` : 型を計算せずに`x`を転送できるが、EWGは専門家向けすぎるものであり、教える手間が増えるとして採用しなかった
- `prvalue_cast`のような別の名前 : 「prvalue」という用語は一般のC++利用者にはなじみが薄く、また配列を配列のまま渡せると期待されうる。`auto`という綴りであれば、`auto v = x;`や`auto`パラメータへの引数渡しと同じように値がdecayされることが伝わる
- `static_cast<auto>(x)` : `T(x)`がCスタイルキャストと区別されないことを理由に`auto(x)`を禁止するコーディング規約への対策として検討されたが、CTADの`static_cast<ClassTemplate>(x)`が禁止されていることとの兼ね合いがあるため、この提案では扱われていない。`auto(x)`が使えない場合は`auto{x}`が代替となる


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 auto](/lang/cpp11/auto.md)
- [C++11 decltype](/lang/cpp11/decltype.md)
- [`std::decay`](/reference/type_traits/decay.md)
- [`decay-copy`](/reference/exposition-only/decay-copy.md)


## 参照
- [P0849R8 `auto(x)`: decay-copy in the language](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0849r8.html)
