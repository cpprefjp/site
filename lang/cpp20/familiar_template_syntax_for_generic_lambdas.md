# ジェネリックラムダのテンプレート構文
* cpp20[meta cpp]

## 概要
C++14では、ラムダ式のパラメータ型に`auto`キーワードを使用することで、任意の型のパラメータを受け取れるようになった：

```cpp
auto f = [](auto x, auto y) {};

f(1, "Hello"); // xの型はint、yの型はconst char*
f(3.14, 'A');  // xの型はdouble、yの型はchar
```

C++17では、任意の型のパラメータを受け取るために、関数テンプレートと同様の、テンプレートパラメータの定義ができるようになる：

```cpp
auto f = []<class T>(const std::vector<T>& v) {
  if (v.empty()) {
    return T();
  }
  else {
    return v.front();
  }
};

std::vector<int> v = {1, 2, 3};
std::vector<std::string> w;

f(v); // Tの型はint
f(w); // Tの型はstd::string
```
* v.empty()[link /reference/vector/empty.md]
* v.front()[link /reference/vector/front.md]


## 仕様
- テンプレートパラメータの定義を含むラムダ式の構文は、以下のようになる：
    ```
    [キャプチャリスト] <テンプレートパラメータリスト> (パラメータリスト) mutable 例外仕様 属性 -> 戻り値の型 { 関数の本体 }
    ```

- テンプレートパラメータリストは省略可能
- テンプレートパラメータには、ほかのテンプレート構文と同様に、`typename`、`class`どちらのキーワードも使用できる
- テンプレートパラメータには、テンプレートテンプレートパラメータも指定できる
- `auto`キーワードとの共存ができる
- `auto`キーワードを使用した場合、パラメータごとに異なるテンプレートパラメータとなるが、この構文では全てのパラメータを同じ型にすることもできる
- 推論規則は関数テンプレートと同じ


## この機能が必要になった背景・経緯
`auto`キーワードを使用したジェネリックラムダは、柔軟さが足りなかった。たとえばパラメータを`std::vector`コンテナにして要素の型だけ可変にしたい場合、関数テンプレートでは「`template <class T> void f(std::vector<T> v)`」のように書けばよかった。しかし、`auto`キーワードの場合にはこのような型推論のための構文が使用できず、パラメータを`std::vector`に限定することがむずかしかった。

```cpp
// 型Tがstd::vectorコンテナかを判定する
template <typename T> struct is_std_vector : std::false_type { };
template <typename T> struct is_std_vector<std::vector<T>> : std::true_type { };

auto f = [](auto vector) {
  static_assert(is_std_vector<decltype(vector)>::value, "");
};
```

テンプレート構文では以下のようになる：

```cpp
auto f = []<typename T>(std::vector<T> v) {
};
```

また、同じ状況において、`std::vector`として受け取ったコンテナ型の要素となる型を取り出したい場合、関数テンプレートでは型推論によって取り出された`T`型を単に使用すればよかった。`auto`キーワードを使用する場合には、以下のように`value_type`を取り出す冗長な指定が必要になった：

```cpp
auto f = [](auto vector) {
  using T = typename decltype(vector)::value_type;
};
```

ほかの状況として、2つめのパラメータが1つめのパラメータによって型を限定できる、という場合に、関数テンプレートでは以下のように記述できた：

```cpp
template <class Iterator>
void advance(Iterator it, typename std::iterator_traits<Iterator>::difference_type n) {
  //…
}
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

`auto`キーワードの場合は、そういった状況では`decltype`を使用しなければならなかった：

```cpp
auto advance = [](auto it, typename std::iterator_traits<decltype(it)>::difference_type n) {
  //…
};
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

テンプレート構文では以下のようになる：

```cpp
auto advance = []<typename Iterator>(Iterator it, typename std::iterator_traits<Iterator>::difference_type n) {
  //…
};
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

最後に、完全転送の問題として、`auto`キーワードを使用した場合、[`std::forward()`](/reference/utility/forward.md)関数に型を指定する唯一の方法は`decltype`を使用することだった：

```cpp
auto f = [](auto&&... args) {
  g(std::forward<decltype(args)>(args)...);
};
```
* std::forward[link /reference/utility/forward.md]

これは正しく動作し、この書き方はScott Meyersのブログでも記事で紹介されているが、Meyersが記事を書かなければならなかったということが、これがユーザーにとって難しい問題であることを表していた。

テンプレート構文では以下のようになる：

```cpp
auto f = []<typename... Args>(Args&&... args) {
  g(std::forward<Args>(args)...);
};
```
* std::forward[link /reference/utility/forward.md]


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)


## 参照
- [P0428R2 Familiar template syntax for generic lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0428r2.pdf)
