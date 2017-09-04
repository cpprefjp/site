# stoll
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long long stoll(const string& str, size_t* idx = nullptr, long long base = 10);
  long long stoll(const wstring& str, size_t* idx = nullptr, long long base = 10);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列`str`を数値として読み取って、`long long`型の値に変換する。


## 効果
パラメータ`str`が`string`型であれば`std::strtoll(str.c_str(), &end, base)`、`wstring`型であれば`std::wcstoll(str.c_str(), &end, base)`を呼び出して、その戻り値を返す。

パラメータ`idx`が非`nullptr`の場合、変換に使用されなかった要素のインデックス（`end - str.c_str()`）が格納される。

パラメータ`base`は、整数文字列`str`の基数を表す。デフォルトでは`10`進数として文字列を整数に変換する。基数は`2`から`36`(`36`含む)進数を指定できる。基数を`0`とした場合は、文字列のプレフィックスから基数が自動的に選択される。自動的な選択のルールは、以下のようになる：

- 先頭が`0`：`8`進数
- 先頭が`0x`もしくは`0X`：`16`進数


## 戻り値
変換して得られた数値が返される。


## 例外
- 数値への変換が行われなかった場合、[`std::invalid_argument`](/reference/stdexcept.md)が送出される。
- 以下の条件に合致した場合、[`std::out_of_range`](/reference/stdexcept.md)が送出される。
    - `std::strtoll()`関数が[`errno`](/reference/cerrno/errno.md)変数に[`ERANGE`](/reference/cerrno.md)を設定した場合 (C++14)
    - 結果が範囲外の値になった場合


## 備考
### errnoの扱い
- Visual C++ 11やGCC (libstdc++) 4.8.2では、この関数を呼び出すと`errno`の値が変更される。
- Clang (libc++) 3.3では、この関数の呼び出し前後で`errno`の値は変化しない。

### グローバルロケールの影響
この関数は、`setlocale()`関数により挙動が変化する。

`strtol()`関数での文字列先頭の空白を読み飛ばす処理に、`<cctype>`の`isspace()`関数が使用されるためである。


## 例
```cpp
#include <iostream>
#include <string>

int main()
{
  // 10進法での変換
  {
    std::cout << "---- base = 10" << std::endl;

    long long x = std::stoll("10"); // std::stoll("10", nullptr, 10);
    std::cout << x << std::endl;

    long long xw = std::stoll(L"11"); // std::stoll(L"11", nullptr, 10);
    std::cout << xw << std::endl;
  }

  // 2進法での変換
  {
    std::cout << "---- base = 2" << std::endl;

    long long x = std::stoll("1001", nullptr, 2);
    std::cout << x << std::endl;

    long long xw = std::stoll(L"01001", nullptr, 2); // 先頭に0が付いていてもよい
    std::cout << xw << std::endl;
  }

  // 8進法での変換
  {
    std::cout << "---- base = 8" << std::endl;

    long long x = std::stoll("10", nullptr, 8);
    std::cout << x << std::endl;

    long long xw = std::stoll(L"11", nullptr, 8);
    std::cout << xw << std::endl;
  }

  // 16進法での変換
  {
    std::cout << "---- base = 16" << std::endl;

    long long x = std::stoll("10", nullptr, 16);
    std::cout << x << std::endl;

    long long xw = std::stoll(L"11", nullptr, 16);
    std::cout << xw << std::endl;
  }

  // 16進法での変換（プレフィックス付き）
  {
    long long x = std::stoll("0x20", nullptr, 16);
    std::cout << x << std::endl;

    long long xw = std::stoll(L"0x21", nullptr, 16);
    std::cout << xw << std::endl;
  }

  // base = 0による10進法・8進法・16進法の自動判別
  {
    std::cout << "---- base = 0" << std::endl;

    std::cout << std::stoll("100", nullptr, 0) << std::endl;
    std::cout << std::stoll("0100", nullptr, 0) << std::endl;
    std::cout << std::stoll("0x100", nullptr, 0) << std::endl;

    std::cout << std::stoll(L"100", nullptr, 0) << std::endl;
    std::cout << std::stoll(L"0100", nullptr, 0) << std::endl;
    std::cout << std::stoll(L"0x100", nullptr, 0) << std::endl;
  }

  // 2番目の仮引数の使用例
  {
    std::cout << "---- use of idx parameter" << std::endl;

    std::string s = "30%";
    std::size_t i;
    long long x = std::stoll(s, &i);
    std::cout << x << ' ' << s[i] << std::endl;

    std::wstring ws = L"31%";
    std::size_t wi;
    long long xw = std::stoll(ws, &wi);
    std::cout << xw << ' ' << wi << std::endl;
  }

  // 文字列先頭に空白がある場合
  {
    std::cout << "---- space character before number" << std::endl;
    std::cout << std::stoll("    -1") << std::endl;
    std::cout << std::stoll(L"    -2") << std::endl;
  }
}
```
* std::stoll[color ff0000]
* std::wstring[link basic_string.md]

### 出力
```
---- base = 10
10
11
---- base = 2
9
9
---- base = 8
8
9
---- base = 16
16
17
32
33
---- base = 0
100
64
256
100
64
256
---- use of idx parameter
30 %
31 2
---- space character before number
-1
-2
```

## 実装例
```cpp
long long stoll(const std::string& str, std::size_t* idx = nullptr, long long base = 10) {
  const char* p = str.c_str();
  char* end;
  errno = 0;
  long long x = std::strtoll(p, &end, base);
  if (p == end) {
    throw std::invalid_argument("stoll");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stoll");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}

long long stoll(const std::wstring& str, std::size_t* idx = nullptr, long long base = 10) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  errno = 0;
  long long x = std::wcstoll(p, &end, base);
  if (p == end) {
    throw std::invalid_argument("stoll");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stoll");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}
```
* str.c_str()[link basic_string/c_str.md]
* std::invalid_argument[link /reference/stdexcept.md]
* std::out_of_range[link /reference/stdexcept.md]
* errno[link /reference/cerrno/errno.md]
* ERANGE[link /reference/cerrno.md]

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [GCC, C++11 mode](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0

## 参照
- [N2408 Simple Numeric Access Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2408.html)
- [LWG Issue 2009. Reporting out-of-bound values on numeric string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2009)

### C標準ライブラリに由来する関数
- `atoll`: `stoll`は`atoll`を`std::string`および`std::wsting`に対応させたものと見なせる。
- `strtoll`, `wcstlol`: `stoll`は`strtoll`および`wcstoll`をそれぞれ`std::string`と`std::wsting`に対応させたものと見なせる。

### ファミリー
- [`stoi`](stoi.md): 戻り値の型が`int`となったもの。
- [`stol`](stol.md): 戻り値の型が`long`となったもの。
- (`stoll`: この関数自身)
- [`stoul`](stoul.md): 戻り値の型が`unsigned long`となったもの。
- [`stoull`](stoull.md): 戻り値の型が`unsigned long long`となったもの。
- [`stof`](stof.md): 戻り値の型が`float`となったもの。
- [`stod`](stod.md): 戻り値の型が`double`となったもの。
- [`stold`](stold.md): 戻り値の型が`long double`となったもの。
