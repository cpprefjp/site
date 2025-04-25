# 定数式での`void*`からポインタ型へのキャストを許可 [P2738R1]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23までは、定数式の文脈での`void*`から元のポインタ型への変換が禁止されていたが、C++26からは許可される。

`void*`から元のポインタ型への変換は、「型消去 (type erasure)」で有用に使われるもので、標準ライブラリの実装としては[`std::any`](/reference/any/any.md)、[`std::function_ref`](/reference/function_ref/functional/funcion_ref.md)、[`std::format()`](/reference/format/format.md)などで使われており、これらがコンパイル時に使用できるようにするための必要となる。

型消去は、テンプレートインスタンスの数を減らし、バイナリサイズを小さくするために一般的に使用される技法である。とくに、メモリ制約のある組み込みプラットフォームでは、共通のコードパスを確保するために型消去が有効である。

`void*`から元のポインタ型に変換することによる型消去の例としては、以下のようになる：

```cpp
#include <string_view>

struct Sheep {
  constexpr std::string_view speak() const noexcept { return "Baaaaaa"; }
};
struct Cow {
  constexpr std::string_view speak() const noexcept { return "Mooo"; }
};

class AnimalView {
private:
  const void* animal;
  std::string_view (*speak_function)(const void*);
public:
  template <typename Animal>
  constexpr AnimalView(const Animal &a)
    : animal{&a}, speak_function{[](const void* object) {
        return static_cast<const Animal*>(object)->speak();
      }}
  {}

  constexpr std::string_view speak() const noexcept {
    return speak_function(animal);
  }
};

int main() {
  constexpr Cow cow;
  constexpr AnimalView av{cow};
  constexpr auto result = av.speak();
}
```

## 仕様
定数式として許可されない操作を、以下のように変更：

- 変更前：「(CV修飾) `void*` 型からオブジェクトへのポインタ型への変換」
- 変更後：「(CV修飾) `void` へのポインタ型のprvalue (一時オブジェクト) `P` から、オブジェクトへのポインタ型`T`への変換。ただし、`P`が`T`と類似 (similar) の型のオブジェクトを指している場合を除く」

これはつまり、`T`から`void*`を経由して`T`に変換することは許可されるが、`void*`を経由してほかの型に変換することは禁止されたままとなる。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 constexpr](/lang/cpp11/constexpr.md)


## 参照
- [P2738R1 `constexpr` cast from `void*`: towards `constexpr` type-erasure](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2738r1.pdf)
