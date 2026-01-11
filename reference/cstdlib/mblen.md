# mblen
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int mblen(const char* str, size_t n);
}
```

## 概要
マルチバイト文字列の先頭の文字が占めるバイト数を返す。

先頭以外の文字に関するバイト数は計算されない。

この関数は現在のロケールカテゴリー `LC_CTYPE` に依存してマルチバイト文字を解釈する。

`n`は解析に使用する最大バイト数を指定する。

内部状態に依存するエンコーディングを考慮するならば、
特に理由がない限り `std::mblen` ではなく `std::mbstate_t` を受け取る `std::mbrlen` を
新しいコードでは用いるべきである。
エンコーディングの内部状態に関する振る舞いが C11 で変更 (WG14 N1373) されたが、
以前の振る舞いではスレッドセーフではなく、
現在の振る舞いではそもそも内部状態に依存する使い方ができない。

### C11, C++17, POSIX.1-2024 以降

この関数は以下の関数呼び出しに等価である。

```cpp
mbtowc((wchar_t *)0, (const char *)0, 0);
mbtowc((wchar_t *)0, str, n);
```
* mbtowc[link mbtowc.md.nolink]

つまり、関数 `mblen` はあたかも内部状態がないかのように振る舞い、
現在のエンコーディングの初期状態を用いて `str` の先頭にある文字のバイト数を計算する。

### C99, C++14, POSIX.1-2017 以前

この関数は以下の関数呼び出しに等価である。

```cpp
mbtowc((wchar_t *)0, str, n);
```
* mbtowc[link mbtowc.md.nolink]

関数 `mblen` は `std::mbstate_t` に等価な静的記憶域の内部状態を保持し、前回の `mblen` 関数呼び出しの続きとして処理を行う。
従って、この関数はスレッドセーフではない。
また、この関数を用いる処理の途中で、この関数を用いる別の処理を行うこともできない。
安全に処理するためには、この関数の代わりに `std::mbstate_t` を受け取る [`std::mbrlen`](../cwchar/mbrlen.md.nolink) (`<cwchar>`) を使い、呼び出し元でデコード状態の記録場所 `std::mbstate_t` を用意する必要がある。

他の標準ライブラリ関数はあたかも`mblen`を呼び出さないように振る舞う。
つまり、明示的に `mblen` を呼び出さない限り、その内部状態を変更しない。

## 戻り値
- 正常に動作する場合、文字の占めるバイト数を返す。
- `str`が`nullptr`の時、内部状態を初期化する。現在のエンコーディングが状態を持つ場合は非ゼロの値を返し、それ以外の場合は`0`を返す。
- 無効な文字列、または`n`が不足している場合、`-1`を返す。

## 例
### 基本的な使い方
```cpp example
#include <clocale>
#include <cstdlib>
#include <cstring>
#include <iostream>

int main() {
  std::setlocale(LC_ALL, "ja_JP.UTF-8");
  const char *str = "こんにちは";
  int result = std::mblen(str, std::strlen(str));
  std::cout << result << std::endl;
  return 0;
}
```

#### 出力例
```
3
```

### 文字列の文字数を計算する
```cpp example
#include <clocale>
#include <cstdlib>
#include <cstring>
#include <iostream>

int count_chars_mblen(const char* s) {
#if __cplusplus >= 201703L
  if (std::mblen(nullptr, 0) != 0) {
    std::cerr << "count_chars_mblen: State-dependent encoding is unsupported." << std::endl;
    std::exit(1);
  }
#else
  // C++14 以前: std::mblen 内部の std::mbstate_t を初期化する必要あり
  std::mblen(nullptr, 0);
#endif

  int count = 0;
  std::size_t i = 0;
  std::size_t bytes = std::strlen(s);
  while (i < bytes) {
    int len = std::mblen(&s[i], bytes - i);
    if (len < 0) {
      len = 1;
    }
    i += len;
    count++;
  }
  return count;
}

int main() {
  std::setlocale(LC_ALL, "ja_JP.UTF-8");

  const char* str = "こんにちは世界";
  std::cout << "文字列: " << str << "\n";
  std::cout << "文字数: " << count_chars_mblen(str) << "\n";
}
```

注意: この例は飽くまで `std::mblen` を用いて文字数を数える関数の例であるが、実用上は `std::mbrlen` を用いた実装にするのが安全である。
上の関数 `count_chars_mblen` はスレッドーセーフでない他、呼び出し元でも `std::mblen` を使っている場合にその振る舞いを破壊する可能性がある。

#### 出力例
```
文字列: こんにちは世界
文字数: 7
```

## 関連項目

- [`mbrlen`](../cwchar/mbrlen.md.nolink): `std::mbstate_t` を受け取るスレッドセーフなバージョン
- [WG14 N1373: Wording improvements for mblen, mbtowc, and c16rtomb](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1373.htm)
    - 単なる「表現の改善」としてこの破壊的な変更が実施されたように見える。
    - [musl のメーリングリスト - 2019-12-26](https://www.openwall.com/lists/musl/2019/12/26/7) にて Florian Weimer が以下のように指摘している:
        "actual users of the interfaces with legacy charsets do not seem to be represented on the standards committee anymore (see the mblen behavioral change in C11 as evidence supporting this theory)."
        訳: C11 における mblen の振る舞い変更でも分かるように、C標準化委員会には古い文字コードを使っている人がいないようだ。
- [WG14 N2037: mblen, mbtowc, and wctomb thread-safety](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2037.htm)
    - [WG14 DR498: mblen, mbtowc, and wctomb thread-safety](https://www.open-std.org/jtc1/sc22/wg14/issues/c11c17/issue0498.html)
    - [WG14 N2246: Make mblen, mbtowc, and wctomb thread-safe for encodings that are not state-dependent](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2246.htm)
    - [WG14 N2281: Make mblen, mbtowc, and wctomb thread-safe for encodings that are not state-dependent](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2281.htm)
    - [WG14 N2358: No internal state for mblen](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2358.htm)
    - C11 以降もあたかも `mblen` が内部状態を持つかのような記述になっていたのが C23 で修正された。
