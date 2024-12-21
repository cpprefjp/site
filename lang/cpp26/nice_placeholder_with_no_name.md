# 宣言のみで使用しない変数の名前として_をサポート [P2169R4]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、宣言だけして使用しない変数として、変数名`_`を特別扱いする。

宣言だけして使用しない変数が必要な状況としては、以下のようなミューテックスのロック取得や、構造化束縛などがある：

```cpp
// C++23まで
std::mutex mux;
std::tuple<T, U, V> f();

void f() {
  std::lock_guard guard{mux}; // デストラクタでの自動解放だけしたいのでguard変数はとくに使わない
  auto [a, b, no_use] = f();  // 構造化束縛した一部の変数は使わない
}
```

C++26では、変数名として`_`は[`[[maybe_unused]]`属性](/lang/cpp17/maybe_unused.md)が付加される、と規定される。

```cpp
// C++26
std::mutex mux;
std::tuple<T, U, V> f();

void f() {
  std::lock_guard _{mux}; // OK
  auto [a, b, _] = f();   // OK
}
```


## 仕様
- 変数名`_`は、「名前非依存 (name independent) の宣言」という名称で扱われ、実装への推奨としては `[[maybe_unused]]`属性が自動的に付加され、使用されなくても警告は出力されない：
    ```cpp
    auto _ = foo(); // [[maybe_unused]] auto _ = f(); と等価
    ```

- 変数名`_`は、以下の状況では再宣言できる：
    - 自動変数
    - 非静的メンバ変数
    - 構造化束縛
    - ラムダ式のキャプチャでの導入子
- 再宣言された変数`_`を使用した場合、プログラムは不適格となる

```cpp
namespace a {
  auto _ = f(); // OK: "_"変数の宣言
  auto _ = f(); // エラー！ "_"はこの名前空間ですでに定義されている
}

void f() {
  auto _ = 42; // OK: "_"変数の宣言
  auto _ = 0;  // OK: "_"変数の再宣言
  {
    auto _ = 1;     // OK: シャドウイング
    assert(_ == 1); // OK
  }
  assert( _ == 42 ); // 不適格: 再宣言されたプレースホルダー変数の使用
}
```


## 例
```cpp example
int main() {
  // gccやclangの場合、-Wallオプションをつけると、
  // 変数が未使用だった場合、警告が出力される。
  // [[maybe_unused]]属性によって、これを抑制することができた。
  [[maybe_unused]] int hardNamingVariable;

  // しかし、今後は、変数名が_であれば、自動的にその属性が適用されるようになる。
  // 以下のコードを-Wallでコンパイルしても、警告は表示されない。
  int _;
}
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 `[[maybe_unused]]`属性](/lang/cpp17/maybe_unused.md)

## 参照
- [P2169R4 A nice placeholder with no name](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2169r4.pdf)
