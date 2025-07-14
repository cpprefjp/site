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
文字列`nptr`を`long`型の整数に変換する。変換時には`base`で指定された基数に従って解釈される。

`endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される。

基数`base`は 2～36 または 0 の値を取る。

`base`が0の場合
- 文字列の先頭が`0`の場合は8進数
- 先頭が`0x`、`0X`は16進数
- その他の場合は10進数として変換される。

変換は次のように行われる
- 先頭の空白文字は最初の非空白文字から変換される。
- `+`または`-`が先頭にある場合は、符号として解釈される。
- その後の文字列を、指定された`base`に基づいて整数値に変換する。


## 戻り値
- 変換可能ならば変換後の数値。

- 変換後の数値が`long`の範囲外の場合、`LONG_MAX`または `LONG_MIN`。

- 変換不可能なら`0`を返す。

## 備考
この関数はスレッドセーフである。



## 例
```cpp example
#include <iostream>
#include <cstdlib>
#include <cerrno>
#include <climits>

int main() {
  const char* str = "  -0x2Fabc";

  errno = 0;
  long result1 = std::strtol(str, nullptr, 0);  // 自動判別
  std::cout << "変換結果(基数0): " << result1 << std::endl;

  errno = 0;
  long result2 = std::strtol(str, nullptr, 10); // 10進数として解釈
  std::cout << "変換結果(基数10): " << result2 << std::endl;

  errno = 0;
  long result3 = std::strtol(str, nullptr, 36); // 36進数として解釈
  std::cout << "変換結果(基数36): " << result3 << std::endl;

  return 0;
}
```
### 出力
```
変換結果(基数0): -195260
変換結果(基数10): 0
変換結果(基数36): -1999456248
```

## 関連項目
- [`strtoll`](strtoll.md.nolink): 文字列を、基数を指定して`long long`型に変換する
- [`strtoul`](strtoul.md.nolink): 文字列を、基数を指定して`unsigned long`型に変換する
- [`strtoull`](strtoull.md.nolink): 文字列を、基数を指定して`unsigned long long`型に変換する
