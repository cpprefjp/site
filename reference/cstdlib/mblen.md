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

この関数は `std::mbstate_t` に等価な静的記憶域の内部状態を保持し、前回の `mblen` 関数呼び出しの続きとして処理を行う。
従って、この関数はスレッドセーフではない。
スレッドセーフに処理する場合は、`std::mbstate_t` を受け取る [`std::mbrlen`](../cwchar/mbrlen.md.nolink) (`<cwchar>`) を使い、呼び出し元でデコード状態の記録場所 `std::mbstate_t` を用意する必要がある。
新しいコードでは、特に理由がない限り `std::mblen` ではなく `std::mbrlen` を用いるべきである。

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
  // std::mblen 内部の std::mbstate_t を初期化する必要あり
  std::mblen(nullptr, 0);

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
