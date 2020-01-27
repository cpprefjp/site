# stoull
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  unsigned long long stoull(const std::string& str,
                            std::size_t* idx = nullptr,
                            unsigned long long base = 10); // (1)

  unsigned long long stoull(const std::wstring& str,
                            std::size_t* idx = nullptr,
                            unsigned long long base = 10); // (2)
}
```

## 概要
文�列`str`を数値として�み取って、`unsigned long long`型の値に変換する。


## 効果
パラメータ`str`が`string`型であれば`std::strtoull(str.c_str(), &end, base)`、`wstring`型であれば`std::wcstoull(str.c_str(), &end, base)`を呼び出して、その戻り値を返す。

パラメータ`idx`が非`nullptr`の場合、変換に使用されなかった要素のインデックス（`end - str.c_str()`）が格納される。

パラメータ`base`は、整数文�列`str`の基数を表す。デフォルトでは`10`進数として文�列を整数に変換する。基数は`2`から`36`(`36`含む)進数を指定できる。基数を`0`とした場合は、文�列のプレフィックスから基数が自動的に選択される。自動的な選択のルールは、以下のようになる：

- 先�が`0`：`8`進数
- 先�が`0x`もしくは`0X`：`16`進数


## 戻り値
変換して得られた数値が返される。


## 例外
- 数値への変換が行われなかった場合、[`std::invalid_argument`](/reference/stdexcept.md)が送出される。
- 以下の条件に合致した場合、[`std::out_of_range`](/reference/stdexcept.md)が送出される。
    - `std::strtoull()`関数が[`errno`](/reference/cerrno/errno.md)変数に[`ERANGE`](/reference/cerrno.md)を�定した場合 (C++14)
    - 結果が範囲外の値になった場合


## 備考
### errnoの扱い
- Visual C++ 11やGCC (libstdc++) 4.8.2では、この関数を呼び出すと`errno`の値が変更される。
- Clang (libc++) 3.3では、この関数の呼び出し前後で`errno`の値は変化しない。

### グ�ーバル�ケールの影響
この関数は、`setlocale()`関数により挙動が変化する。

`strtoull()`関数での文�列先�の空白を�み飛ばす処理に、`<cctype>`の`isspace()`関数が使用されるためである。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // 10進法での変換
  {
    std::cout << "---- base = 10" << std::endl;

    unsigned long long x = std::stoull("10"); // std::stoull("10", nullptr, 10);
    std::cout << x << std::endl;

    unsigned long long xw = std::stoull(L"11"); // std::stoull(L"11", nullptr, 10);
    std::cout << xw << std::endl;
  }

  // 2進法での変換
  {
    std::cout << "---- base = 2" << std::endl;

    unsigned long long x = std::stoull("1001", nullptr, 2);
    std::cout << x << std::endl;

    unsigned long long xw = std::stoull(L"01001", nullptr, 2); // 先�に0が付いていてもよい
    std::cout << xw << std::endl;
  }

  // 8進法での変換
  {
    std::cout << "---- base = 8" << std::endl;

    unsigned long long x = std::stoull("10", nullptr, 8);
    std::cout << x << std::endl;

    unsigned long long xw = std::stoull(L"11", nullptr, 8);
    std::cout << xw << std::endl;
  }

  // 16進法での変換
  {
    std::cout << "---- base = 16" << std::endl;

    unsigned long long x = std::stoull("10", nullptr, 16);
    std::cout << x << std::endl;

    unsigned long long xw = std::stoull(L"11", nullptr, 16);
    std::cout << xw << std::endl;
  }

  // 16進法での変換（プレフィックス付き）
  {
    unsigned long long x = std::stoull("0x20", nullptr, 16);
    std::cout << x << std::endl;

    unsigned long long xw = std::stoull(L"0x21", nullptr, 16);
    std::cout << xw << std::endl;
  }

  // base = 0による10進法・8進法・16進法の自動判別
  {
    std::cout << "---- base = 0" << std::endl;

    std::cout << std::stoull("100", nullptr, 0) << std::endl;
    std::cout << std::stoull("0100", nullptr, 0) << std::endl;
    std::cout << std::stoull("0x100", nullptr, 0) << std::endl;

    std::cout << std::stoull(L"100", nullptr, 0) << std::endl;
    std::cout << std::stoull(L"0100", nullptr, 0) << std::endl;
    std::cout << std::stoull(L"0x100", nullptr, 0) << std::endl;
  }

  // 2番目の仮引数の使用例
  {
    std::cout << "---- use of idx parameter" << std::endl;

    std::string s = "30%";
    std::size_t i;
    unsigned long long x = std::stoull(s, &i);
    std::cout << x << ' ' << s[i] << std::endl;

    std::wstring ws = L"31%";
    std::size_t wi;
    unsigned long long xw = std::stoull(ws, &wi);
    std::cout << xw << ' ' << wi << std::endl;
  }

  // 文�列先�に空白がある場合
  {
    std::cout << "---- space character before number" << std::endl;
    std::cout << std::stoull("    1") << std::endl;
    std::cout << std::stoull(L"    2") << std::endl;
  }
}
```
* std::stoull[color ff0000]

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
1
2
```

## 実装例
```cpp
unsigned long long stoull(const std::string& str, std::size_t* idx = nullptr, unsigned long long base = 10) {
  const char* p = str.c_str();
  char* end;
  errno = 0;
  unsigned long long x = std::strtoull(p, &end, base);
  if (p == end) {
    throw std::invalid_argument("stoull");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stoull");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}

unsigned long long stoull(const std::wstring& str, std::size_t* idx = nullptr, unsigned long long base = 10) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  errno = 0;
  unsigned long long x = std::wcstoull(p, &end, base);
  if (p == end) {
    throw std::invalid_argument("stoull");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stoull");
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
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 関連リンク
### C標準ライブラリに由来する関数
- `atoll`: `stoull`は`atoll`を`std::string`および`std::wsting`に対応させ、戻り値の型を`unsigned long long`に変更したものと見なせる。
- `strtoll`, `wcstoll`: `stoull`は`strtoll`および`wcstoull`をそれぞれ`std::string`と`std::wsting`に対応させたものと見なせる。

### ファミリー
- [`stoi`](stoi.md): 戻り値の型が`int`となったもの。
- [`stol`](stol.md): 戻り値の型が`long`となったもの。
- [`stoll`](stoll.md): 戻り値の型が`long long`となったもの。
- [`stoul`](stoul.md): 戻り値の型が`unsigned long`となったもの。
- (`stoull`: この関数自身)
- [`stof`](stof.md): 戻り値の型が`float`となったもの。
- [`stod`](stod.md): 戻り値の型が`double`となったもの。
- [`stold`](stold.md): 戻り値の型が`long double`となったもの。

### �ケール依�しない高速な変換関数
- [`from_chars`](/reference/charconv/from_chars.md)


## 参照
- [N2408 Simple Numeric Access Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2408.html)
- [LWG Issue 2009. Reporting out-of-bound values on numeric string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2009)
