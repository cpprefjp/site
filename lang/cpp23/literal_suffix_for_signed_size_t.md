# (符号付き)size_tリテラルのためのサフィックス [P0330R8]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、符号なし整数型[`size_t`](/reference/cstddef/size_t.md)に対応する符号付き整数型を表すリテラルの`z`および`Z`サフィックスを追加する。符号なしを表す`u`および`U`サフィックスをともに使用することで[`size_t`](/reference/cstddef/size_t.md)型のリテラルを記述できる。

```cpp
auto a = 10z;  // size_tに対応する符号付き整数型
auto b = 10uz; // size_t型
auto c = 10UZ; // size_t型 (大文字でも同じ意味)
auto d = 10zu; // size_t型 (uとzは順不同)
```


## この機能が必要になった背景・経緯
コンテナの要素数や普遍的なサイズを表す型として`size_t`は広く使用されてきたが、それを表すリテラル表現がなかったために、いくつかのケースで不便だった。

### コンテナをfor文で回す際の初期値
```cpp
std::vector<int> v{0, 1, 2, 3};

// case 1
for (auto i = 0u, s = v.size(); i < s; ++i) {}

// case 2
for (auto i = 0, s = v.size(); i < s; ++i) {}

// case 3
for (auto i = 0uz, s = v.size(); i < s; ++i) {}
```

ここでのcase 1では、`0u`は`unsigned int`型リテラルとなり、[`size_t`](/reference/cstddef/size_t.md)型が64ビットとして定義される場合に、[`size_t`](/reference/cstddef/size_t.md)型を`unsigned int`型に丸めるために警告が出力される可能性がある。

case 2はコンパイルエラーとなる。

case 3はC++23で導入する[`size_t`](/reference/cstddef/size_t.md)型リテラルを使用するため、問題なく動作する。


### min/maxに指定する2つの値の型
```cpp
std::size_t size = …;

// case 1
std::size_t clamped_size = std::max(0, std::min(54, size));

// case 2
std::size_t clamped_size = std::max(0uz, std::min(54uz, size));
```

case 1はコンパイルエラーとなる。[`std::min()`](/reference/algorithm/min.md)と[`std::max()`](/reference/algorithm/max.md)は2つの引数が同じ型であることを期待するため、`int`型の値と[`size_t`](/reference/cstddef/size_t.md)型の値の2つ渡そうとするとコンパイルエラーとなる。`std::max<std::size_t>(a, b)`のようにテンプレート引数を明示的に指定する回避方法もある。

case 2はC++23で導入する[`size_t`](/reference/cstddef/size_t.md)型リテラルを使用するため、問題なく動作する。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`std::cmp_less()`](/reference/utility/cmp_less.md)
- [`std::ssize()`](/reference/iterator/ssize.md)


## 参照
- [P0330R8 Literal Suffix for (signed) `size_t`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p0330r8.html)