# #embedにoffsetパラメータを追加 [P3540R3]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、[C++26で導入されたファイルを読み込む`#embed`命令](/lang/cpp26/embed.md)のパラメータとして、リソースの先頭から指定した要素数を読み飛ばす`offset`が追加される。

```cpp
constexpr unsigned char arr[] = {
#embed "data.bin"
};

constexpr unsigned char offset_arr[] = {
#embed "data.bin" offset(2)  // 先頭2バイトを読み飛ばす
};

static_assert(arr[2] == offset_arr[0]);
static_assert(arr[3] == offset_arr[1]);
```

ヘッダ部分を読み飛ばしてデータ本体だけを埋め込む、といった用途に使用できる。この機能は、GCCとClangがベンダーパラメータ`gnu::offset`／`clang::offset`として実装していた既存の拡張を、標準のパラメータとして採用したものである。


## 仕様
- `offset(定数式)`は、リソースの先頭から読み飛ばす要素数を表す。`offset`パラメータは、1つの`#embed`命令に一度までしか指定できない
- 定数式は、値が0以上の汎整数定数式であること。0を指定した場合はなにも読み飛ばされない
- リソースのサイズ以上の値を指定した場合、リソースは空として扱われる（`if_empty`パラメータが適用される）
- `offset`は、`limit`パラメータの適用前の、リソース本来のサイズに対して適用される。両方を指定した場合、埋め込まれる要素数は「`offset`で読み飛ばした残りの要素数」と`limit`の値の小さいほうとなる
    ```cpp
    constexpr unsigned char offset_limit_arr[] = {
    #embed "data.bin" offset(1) limit(1)  // 2バイト目の1バイトだけを埋め込む
    };

    static_assert(arr[1] == offset_limit_arr[0]);
    ```
- 機能テストマクロ`__cpp_pp_embed`の値が`202606L`に更新される


## 例
```cpp example
// ABCDEF
#include <iostream>

// このファイル自身をリソースとして埋め込む
constexpr unsigned char arr[] = {
#embed __FILE__ limit(9)
};

constexpr unsigned char offset_arr[] = {
#embed __FILE__ offset(3) limit(6)
};

int main()
{
  // offset(3)によって、先頭の「// 」が読み飛ばされる
  static_assert(offset_arr[0] == 'A');
  static_assert(arr[3] == offset_arr[0]);

  for (unsigned char c : offset_arr) {
    std::cout << c;
  }
  std::cout << std::endl;
}
```

### 出力
```
ABCDEF
```


## この機能が必要になった背景・経緯
`offset`パラメータは、`#embed`がC23に採用された後になってユーザーから要望されたため、`#embed`本体（C++26ではP1967R14）とは別に標準化されることになった。要望を受けてGCCとClangはそれぞれ`gnu::offset`／`clang::offset`というベンダーパラメータとして先行実装しており、広く使われていたため、この既存の実装の動作（`limit`より先に適用される、リソースのサイズ以上なら空になる等）をそのまま標準のパラメータとして採用した。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 ファイルを読み込む`#embed`命令を追加](/lang/cpp26/embed.md)


## 参照
- [P3540R3 `#embed` offset parameter](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3540r3.html)
