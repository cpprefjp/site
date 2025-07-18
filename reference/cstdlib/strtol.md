# strtol
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  long int strtol(const char* nptr, char** endptr, int base);
}
```

## 概要
文字列`nptr`を`long`型の整数に変換する。文字列は`base`で指定された基数に従って解釈される。

`endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される。

基数`base`は 2～36 または 0 の値を取る。

`base`が0の場合
- 文字列の先頭が`0x`または`0X`のときは16進数
- 文字列の先頭が`0`のときは8進数
- その他のときは10進数として変換する。

変換は次のように行われる
- 先頭が空白文字の場合、最初の非空白文字から変換される。
- `+`または`-`が先頭にある場合は、符号として解釈される。
- 基数が 16 または 0 の場合`0x`または`0X`をスキップする
- その後の文字列を、指定された`base`に基づいて整数値に変換する。
- 各桁は、`0`〜`9`をその値、`a`〜`z`および`A`〜`Z`を10〜35として扱う。

## 戻り値
- 変換可能ならば変換後の数値。
- 変換後の数値が`long`の範囲外の場合、`LONG_MAX`または `LONG_MIN`。
- 変換不可能なら`0`を返す。

## 備考
- 数値が `long` の範囲を超えるときは `errno` に `ERANGE` が設定される。

## 例
```cpp example
#include <iostream>
#include <cstdlib>
#include <cerrno>
#include <climits>

void convert_and_print(const char* str, int base) {
  errno = 0;
  char* end = nullptr;
  long result = std::strtol(str, &end, base);

  std::cout << "基数" << base << "での変換結果: " << result << std::endl;
  if (str == end) {
    std::cout << "変換不可" << std::endl;
  } else if (errno == ERANGE) {
    std::cout << "  → 変換結果が範囲外" << std::endl;
  }
  if (*end != '\0') {
    std::cout << "未変換部分: \"" << end << "\"" << std::endl;
  }
  std::cout << std::endl;
}

int main() {
  const char* str = "  -0x2Fabc";
  convert_and_print(str, 0);   // 自動判別
  convert_and_print(str, 10);  // 10進数
  convert_and_print(str, 36);  // 36進数

  return 0;
}

```
### 出力
```
基数0での変換結果: -195260

基数10での変換結果: 0
未変換部分: "x2Fabc"

基数36での変換結果: -1999456248

```

## 関連項目
- [`strtoll`](strtoll.md.nolink): 文字列を、基数を指定して`long long`型に変換する
- [`strtoul`](strtoul.md.nolink): 文字列を、基数を指定して`unsigned long`型に変換する
- [`strtoull`](strtoull.md.nolink): 文字列を、基数を指定して`unsigned long long`型に変換する
- [`std::stol`](/reference/string/stol.md): 文字列から`long`型への変換
- [`<charconv>` ヘッダ](/reference/charconv.md): 高速な文字列 ⇔ 数値変換

## 参考文献
- [C言語で安全に標準入力から数値を取得 #stdin - Qiita](https://qiita.com/yumetodo/items/238751b879c09b56234b): Cのstrtolの使い方とendptrの活用例
