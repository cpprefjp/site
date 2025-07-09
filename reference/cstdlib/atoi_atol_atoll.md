# atoi,atol,atoll
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int       atoi ( const char* str );
  long      atol ( const char* str );
  long long atoll( const char* str );
}
```

## 概要

`str`を`int` 、`long` 、`long long`に変換する。

基数は常に10である。

## 変換方法

空白文字から始まる場合、最初の非空白文字から変換する。

\+　、\-は変換後の符号に適用される。


変換不可能ならば0を返す。

## 備考

変換後の数値が戻り値の範囲外の場合、動作は未定義である。

名前は、ASCII to integerから命名。

## 例

```cpp example
#include <cstdio>
#include <cstdlib>
 
int main(void)
{
  printf("%i\n", atoi(" -123junk"));
  printf("%i\n", atoi(" +321dust"));
  printf("%i\n", atoi("0"));
  printf("%i\n", atoi("0042")); // 先頭の0を含む10進数として変換
  printf("%i\n", atoi("0x2A")); // 0のみを変換、"x2A"は破棄される
  printf("%i\n", atoi("junk")); // 変換不可
  printf("%i\n", atoi("2147483648")); //intの範囲外
}
```

## 出力例

```
-123
321
0
42
0
0
-2147483648
```

## 関連項目
- [`stoi`](/reference/string/stoi.md)
- [`stol`](/reference/string/stol.md)
- [`stoll`](/reference/string/stoll.md)

それぞれ`std::string` および `std::wstring` に対応させたものと見なせる。

## 参照
- [C N3220: 7.22.1.2 The atoi, atol, and atoll functions](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf)
- [C N2310: 7.22.1.2 The atoi, atol, and atoll functions (p: 249)](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf)
- [C N1548: 7.22.1.2 The atoi, atol, and atoll functions (p: 341)](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1548.pdf)
- C99: 7.20.1.2 The atoi, atol, and atoll functions (p: 307)
- C99: 4.10.1.2 The atoi function
