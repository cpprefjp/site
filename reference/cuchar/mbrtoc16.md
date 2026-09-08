# mbrtoc16
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  size_t mbrtoc16(char16_t* pc16, const char* s, size_t n, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link /reference/cwchar/mbstate_t.md]

## 概要
マルチバイト文字を、UTF-16文字 (`char16_t`) に変換する。

`s`が指す位置から最大`n`バイトを読み込んで1文字分のマルチバイト文字を解析し、対応するUTF-16のコード単位を`pc16`が指す位置へ格納する。変換状態は`ps`が指すオブジェクトに保持されるため、複数のスレッドから安全に使用できる。

1つのマルチバイト文字が2つの`char16_t`（サロゲートペア）に対応する場合、最初の呼び出しで上位サロゲートが格納され、続けて同じ変換状態で呼び出すと、入力を消費せずに下位サロゲートが格納される。このとき戻り値は`(size_t)-3`となる。

`s`がヌルポインタの場合、`mbrtoc16(nullptr, "", 1, ps)`の呼び出しと等価であり、変換状態を初期状態に戻す動作となる。


## 戻り値
| 戻り値 | 意味 |
|--------|------|
| `0` | ヌル文字へ変換された |
| 正の値（`n`以下） | 変換に使用したバイト数 |
| `(size_t)-1` | 不正なバイト列である。[`errno`](/reference/cerrno/errno.md)に`EILSEQ`が設定され、変換状態は未規定となる |
| `(size_t)-2` | 次の`n`バイトは不完全だが、不正ではない文字の一部である |
| `(size_t)-3` | 入力を消費せず、前回の呼び出しで解析した文字の続きのコード単位が格納された |


## 備考
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される
- マルチバイト文字の解釈は、現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存する


## 例
### 基本的な使い方
```cpp example
#include <cuchar>
#include <clocale>
#include <cstdio>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const char src[] = "あ";
  char16_t c = 0;
  std::mbstate_t state{};

  // UTF-8の3バイトを消費して1文字へ変換される
  std::size_t n = std::mbrtoc16(&c, src, sizeof(src), &state);
  std::printf("%zu %04X\n", n, (unsigned)c);
}
```
* std::mbrtoc16[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

#### 出力例
```
3 3042
```


### サロゲートペアになる文字を変換する
```cpp example
#include <cuchar>
#include <clocale>
#include <cstdio>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const char src[] = "\U0001F600"; // 😀 (U+1F600)
  std::mbstate_t state{};
  char16_t high = 0;
  char16_t low = 0;

  // 1回目の呼び出しで4バイトを消費し、上位サロゲートを格納する
  std::size_t n1 = std::mbrtoc16(&high, src, sizeof(src), &state);

  // 2回目の呼び出しは入力を消費せず、下位サロゲートを格納して(size_t)-3を返す
  std::size_t n2 = std::mbrtoc16(&low, src + n1, sizeof(src) - n1, &state);

  std::printf("%zu %04X\n", n1, (unsigned)high);
  std::printf("%zd %04X\n", (long)n2, (unsigned)low);
}
```
* std::mbrtoc16[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

#### 出力例
```
4 D83D
-3 DE00
```


## バージョン
### 言語
- C++11


## 関連項目
- [`c16rtomb`](c16rtomb.md): 逆方向の変換
- [`mbrtoc32`](mbrtoc32.md)
- [`mbrtoc8`](mbrtoc8.md): UTF-8文字への変換
- [`std::mbrtowc()`](/reference/cwchar/mbrtowc.md): ワイド文字への変換


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
