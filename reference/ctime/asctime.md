# asctime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26deprecated[meta cpp]

```cpp
namespace std {
  char* asctime(const tm* timeptr);
}
```
* tm[link tm.md.nolink]

この関数は、C++26で非推奨となった。代わりに`strftime`関数や、[`<chrono>`](/reference/chrono.md)ライブラリの書式化機能を使用すること。


## 概要
カレンダー時間を表す`tm`構造体を、`Www Mmm dd hh:mm:ss yyyy\n`形式 (曜日、月、日、時、分、秒、年) の固定書式の文字列に変換する。


## 戻り値
`Www Mmm dd hh:mm:ss yyyy\n`形式 (曜日、月、日、時、分、秒、年) のヌル終端文字列へのポインタを返す。

戻り値は静的に確保された領域を指すため、`asctime`や`ctime`の呼び出しのたびに上書きされる可能性がある。


## 非推奨・削除の詳細
C++26では、C言語側 (C23) で非推奨となったことにあわせて非推奨となった。この関数には以下の問題がある：

- 結果を静的な内部バッファに書き込んでそのポインタを返すため、スレッドセーフではない
- 内部バッファは固定長 (26バイト) であり、`timeptr`に範囲外の値 (たとえば桁数の大きい年) が格納されているとバッファオーバーフローを引き起こす危険性がある

これらの代わりに、フォーマットとバッファサイズを指定できる`strftime`関数や、[`<chrono>`](/reference/chrono.md)ライブラリの書式化機能を使用すること。


## 例
```cpp example
#include <iostream>
#include <ctime>

int main()
{
  std::time_t t = std::time(nullptr);
  std::tm* lt = std::localtime(&t);
  std::cout << std::asctime(lt) << std::endl;
}
```
* std::asctime[color ff0000]

### 出力例
```
Fri May 29 14:30:00 2026
```


## バージョン
### 言語
- C++03


## 関連項目
- [`ctime`](ctime.md): 経過秒を日時として文字列化する
- [`<chrono>`](/reference/chrono.md)


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、この関数が非推奨となった
