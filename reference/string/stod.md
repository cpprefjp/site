# stod
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  double stod(const std::string& str, std::size_t* idx = nullptr);  // (1)
  double stod(const std::wstring& str, std::size_t* idx = nullptr); // (2)
}
```

## 概要
文�列`str`を数値として�み取って、`double`型の値に変換する。


## 効果
パラメータ`str`が`string`型であれば`std::strtod(str.c_str(), &end)`、`wstring`であれば`std::wcstod(str.c_str(), &end)`を呼び出して、その戻り値を返す。

パラメータ`idx`が非`nullptr`の場合、変換に使用されなかった要素のインデックス（`end - str.c_str()`）が格納される。


## 戻り値
変換して得られた数値が返される。


## 例外
- 数値への変換が行われなかった場合、[`std::invalid_argument`](/reference/stdexcept.md)が送出される。
- 以下の条件に合致した場合、[`std::out_of_range`](/reference/stdexcept.md)が送出される。
    - `std::strtoull()`関数が[`errno`](/reference/cerrno/errno.md)変数に[`ERANGE`](/reference/cerrno.md)を�定した場合
    - 結果が範囲外の値になった場合 (C++14)


## 備考
### errnoの扱い
- Visual C++ 11やGCC (libstdc++) 4.8.2では、この関数を呼び出すと`errno`の値が変更される。
- Clang (libc++) 3.3では、この関数の呼び出し前後で`errno`の値は変化しない。

### グ�ーバル�ケールの影響
この関数は、`setlocale()`関数により挙動が変化する。

- `strtod()`関数での文�列先�の空白を�み飛ばす処理に、`<cctype>`の`isspace()`関数が使用される。
- 小数点記号は`LC_NUMERIC`で指定されたものが使用される。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // 10進法での変換
  std::cout << "---- decimal point" << std::endl;

  double a = std::stod("1.5"); // std::stod("1.5", nullptr);
  std::cout << a << std::endl;

  double aw = std::stod(L"1."); // std::stod(L"1.", nullptr);
  std::cout << aw << std::endl;

  // 指数表記の変換
  std::cout << "---- base = 8" << std::endl;

  double b = std::stod("0.5e3", nullptr);
  std::cout << b << std::endl;

  double bw = std::stod(L".25e3", nullptr);
  std::cout << bw << std::endl;

  // 16進法での変換
  std::cout << "---- base = 16" << std::endl;

  double c = std::stod("0x1.2P3", nullptr);
  std::cout << c << std::endl;

  double cw = std::stod(L"0x1.2P4", nullptr);
  std::cout << cw << std::endl;

  // 2番目の仮引数の使用例
  std::cout << "---- use of idx parameter" << std::endl;

  std::string es = "30.75%";
  std::size_t ei;
  double e = std::stod(es, &ei);
  std::cout << e << ' ' << es[ei] << std::endl;

  std::wstring ews = L"32%";
  std::size_t ewi;
  double ew = std::stod(ews, &ewi);
  std::cout << ew << ' ' << ewi << std::endl;

  // 文�列先�に空白がある場合
  std::cout << "---- space character before number" << std::endl;
  std::cout << std::stod("    -1") << std::endl;
  std::cout << std::stod(L"    -.25") << std::endl;
}
```
* std::stod[color ff0000]

### 出力例
```
1.5
1
500
250
---- base = 16
9
18
---- use of idx parameter
30.75 %
32 2
---- space character before number
-1
-0.25
```

## 実装例
```cpp
double stod(const std::string& str, std::size_t* idx = nullptr) {
  const char* p = str.c_str();
  char* end;
  errno = 0;
  double x = std::strtod(p, &end);
  if (p == end) {
    throw std::invalid_argument("stod");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stod");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}

double stod(const std::wstring& str, std::size_t* idx = nullptr) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  errno = 0;
  double x = std::wcstod(p, &end);
  if (p == end) {
    throw std::invalid_argument("stod");
  }
  if (errno == ERANGE) {
    throw std::out_of_range("stod");
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

ただし、Visual C++ 10.0, 11.0は十�進法に対応していない（12.0は未確認）。


## 関連リンク
### C標準ライブラリに由来する関数
- `atof`: `stod`は`atof`を`std::string`および`std::wsting`に対応させたものと見なせる。
- `strtod`, `wcstod`: `stod`は`strtod`および`wcstod`をそれぞれ`std::string`と`std::wsting`に対応させたものと見なせる。

### ファミリー
- [`stoi`](stoi.md): 戻り値の型が`int`となったもの。
- [`stol`](stol.md): 戻り値の型が`long`となったもの。
- [`stoll`](stoll.md): 戻り値の型が`long long`となったもの。
- [`stoul`](stoul.md): 戻り値の型が`unsigned long`となったもの。
- [`stoull`](stoull.md): 戻り値の型が`unsigned long long`となったもの。
- [`stof`](stof.md): 戻り値の型が`float`となったもの。
- (`stod`: この関数自身)
- [`stold`](stold.md): 戻り値の型が`long double`となったもの。

### �ケール依�しない高速な変換関数
- [`from_chars`](/reference/charconv/from_chars.md)


## 参照
- [N2408 Simple Numeric Access Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2408.html)
- [LWG Issue 2009. Reporting out-of-bound values on numeric string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2009)
