# ポインタから`bool`への変換を縮小変換とする [P1957R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

ポインタ型（メンバポインタも含む）から`bool`型への変換が、縮小変換として規定されるようになる。

```cpp
struct A {
  bool b;
};

int main() {
  int *p = nullptr;

  A a{p}; // NG、{}初期化では縮小変換は許可されない
}
```

これはC++17に対する欠陥報告であるため、実装済みのコンパイラにおいてはC++17モード（-std=c++17を指定した場合など）でコンパイルした場合にも適用される。

## この機能が必要になった背景・経緯

C++17で導入された`std::variant`には当初、`const char*`から`bool`への暗黙変換によって意図しない構築がなされるバグがあった。

```cpp
std::variant<std::string, bool> x = "abc";  // boolを保持して構築されてしまう
```
* variant[link /reference/variant/variant.md]
* string[link /reference/string/basic_string.md]

この他にも構築・代入時に縮小変換が行われてしまう事から同様の問題があり、それはC++20において[P0608R3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0608r3.html)によって解決された。そこでは、構築・代入時の縮小変換を禁止するとともに、`bool`に変換可能な型を`bool`に変換することを禁止することで問題に対処していた。

しかしそれによって、`bool`に変換可能なユーザー定義型を`bool`値として構築・代入することができなくなった。

```cpp
std::bitset<4> b("0101");
std::variant<bool, int> v = b[1]; // intを保持して構築されてしまう
```
* bitset[link /reference/bitset/bitset.md]
* variant[link /reference/variant/variant.md]

`std::bitset`の非`const`な[`operator[]`](/reference/bitset/bitset/op_at.md)は`bool`型へ暗黙変換可能なプロキシオブジェクトを返す。

`std::variant`の構築・代入時に縮小変換が起こることを検出して防止することはライブラリレベルで可能だったが、ポインタ型から`bool`への変換を縮小変換として扱うということはライブラリレベルでは実装できなかったため`bool`への変換全体を禁止せざるを得ず、このような問題が発生していた。

これらの問題の解決のために、ポインタ型から`bool`型への変換は縮小変換であると規定することになった。これによって、`std::variant`の構築・代入時のポインタ型から`bool`型への変換は縮小変換の一種として検出され禁止されるようになり、上記のコードは意図どおりに動作するようになる。

```cpp
std::variant<std::string, bool> x = "abc";  // std::stringを保持して構築

std::bitset<4> b("0101");
std::variant<bool, int> v = b[1]; // boolを保持して構築
```

`{}`初期化では縮小変換が禁止されているためこれは破壊的変更となるが、そのような変換は多くの場合バグの可能性が高いこと、MSVCは非リテラルのポインタから`bool`への変換を縮小変換として扱っていたことなどから、影響は少なくメリットの方が大きいと判断されたようだ。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [`std::variant::`コンストラクタ](/reference/variant/variant/op_constructor.md)
- [`std::variant::operator=`](/reference/variant/variant/op_assign.md)

## 参照

- [P1957R2 Converting from `T*` to `bool` should be considered narrowing (re: US 212)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1957r2.html)
- [LWG Issue 3228. Surprising `variant` construction](https://cplusplus.github.io/LWG/issue3228)
- [P0608R3 A sane `variant` converting constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0608r3.html)