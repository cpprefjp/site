# mbrtoc8
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  size_t mbrtoc8(char8_t* pc8, const char* s, size_t n, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
マルチバイト文字を、UTF-8文字 (`char8_t`) に変換する。

C23で`<uchar.h>`に追加された関数であり、C++26で`<cuchar>`に取り込まれた。


## 効果
`s`がヌルポインタの場合、`mbrtoc8(nullptr, "", 1, ps)`の呼び出しと等価である (このとき`pc8`と`n`は無視される)。

`s`がヌルポインタでない場合、`s`が指す位置から最大`n`バイトを検査し、次のマルチバイト文字を完成させるのに必要なバイト数を判定する。次のマルチバイト文字が完全かつ有効であれば、対応する文字の値を決定し、`pc8`がヌルポインタでなければ最初の (もしくは唯一の) 文字を`pc8`が指すオブジェクトに格納する。

1つのマルチバイト文字が複数の`char8_t`に対応する場合、後続の呼び出しでは入力を消費せずに残りの文字を順次格納する。


## 戻り値
変換状態に応じて、以下のうち最初に該当するものを返す。

| 戻り値 | 意味 |
|--------|------|
| `0`             | 次の`n`バイト以内で、ヌル文字に対応するマルチバイト文字が完成した |
| `1`～`n`         | 次の`n`バイト以内で有効なマルチバイト文字が完成した。値はその完成に要したバイト数 |
| `(size_t)(-3)`  | 前回の呼び出しの結果である次の文字が格納された (入力バイトは消費されない) |
| `(size_t)(-2)`  | 次の`n`バイトが不完全な (が、潜在的に有効な) マルチバイト文字に寄与し、すべての`n`バイトを処理した (値は格納されない) |
| `(size_t)(-1)`  | エンコードエラー。`errno`に`EILSEQ`が格納され、変換状態は未規定となる |


## 例
```cpp example
#include <cuchar>
#include <print>

int main()
{
  const char src[] = "A";
  char8_t c8;
  std::mbstate_t state{};

  std::size_t r = std::mbrtoc8(&c8, src, sizeof(src), &state);
  std::println("{} {}", r, static_cast<int>(c8));
}
```
* std::mbrtoc8[color ff0000]

### 出力例
```
1 65
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`c8rtomb`](c8rtomb.md): UTF-8文字 (`char8_t`) を、マルチバイト文字に変換する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、この関数が`<cuchar>`に追加された
