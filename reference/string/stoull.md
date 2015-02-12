#stoull (C++11)
```cpp
namespace std {
  unsigned long long stoull(const string& str, size_t* idx = nullptr, unsigned long long base = 10);
  unsigned long long stoull(const wstring& str, size_t* idx = nullptr, unsigned long long base = 10);
}
```
* size_t[link /reference/cstddef/size_t.md]

##概要
文字列`str`を数値として読み取って、`unsigned long long`型の値に変換する。


##効果
パラメータ`str`が`string`型であれば`std::strtoull(str.c_str(), &end, base)`、`wstring`型であれば`std::wcstoull(str.c_str(), &end, base)`を呼び出して、その戻り値を返す。

パラメータ`idx`が非`nullptr`の場合、変換に使用されなかった要素のインデックス（`end - str.c_str()`）が格納される。

パラメータ`base`は、整数文字列`str`の基数を表す。デフォルトでは`10`進数として文字列を整数に変換する。基数は`2`から`36`(`36`含む)進数を指定できる。基数を`0`とした場合は、文字列のプレフィックスから基数が自動的に選択される。自動的な選択のルールは、以下のようになる：

- 先頭が`0`：`8`進数
- 先頭が`0x`もしくは`0X`：`16`進数


##戻り値
変換して得られた数値が返される。


##例外
- 数値への変換が行われなかった場合、[`std::invalid_argument`](/reference/stdexcept.md)が送出される。
- 以下の条件に合致した場合、[`std::out_of_range`](/reference/stdexcept.md)が送出される。
    - `std::strtoull()`関数が`std::errno`変数に`ERANGE`を設定した場合 (C++14)
    - 結果が範囲外の値になった場合


##備考
### errnoの扱い
- Visual C++ 11やGCC (libstdc++) 4.8.2では、この関数を呼び出すと`errno`の値が変更される。
- Clang (libc++) 3.3では、この関数の呼び出し前後で`errno`の値は変化しない。

### グローバルロケールの影響
この関数は、`setlocale()`関数により挙動が変化する。

`strtoull()`関数での文字列先頭の空白を読み飛ばす処理に、`<cctype>`の`isspace()`関数が使用されるためである。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  // 十進法での変換
  std::cout << "---- base = 10" << std::endl;

  unsigned long long a = std::stoull("10"); // std::stoull("10", nullptr, 10);
  std::cout << a << std::endl;

  unsigned long long aw = std::stoull(L"11"); // std::stoull(L"11", nullptr, 10);
  std::cout << aw << std::endl;

  // 八進法での変換
  std::cout << "---- base = 8" << std::endl;

  unsigned long long b = std::stoull("10", nullptr, 8);
  std::cout << b << std::endl;

  unsigned long long bw = std::stoull(L"11", nullptr, 8);
  std::cout << bw << std::endl;

  // 十六進法での変換
  std::cout << "---- base = 16" << std::endl;

  unsigned long long c = std::stoull("10", nullptr, 16);
  std::cout << c << std::endl;

  unsigned long long cw = std::stoull(L"11", nullptr, 16);
  std::cout << cw << std::endl;

  // 十六進法での変換（プレフィックス付き）
  unsigned long long d = std::stoull("0x20", nullptr, 16);
  std::cout << d << std::endl;

  unsigned long long dw = std::stoull(L"0x21", nullptr, 16);
  std::cout << dw << std::endl;

  // base = 0による十進法・八進法・十六進法の自動判別
  std::cout << "---- base = 0" << std::endl;

  std::cout << std::stoull("100", nullptr, 0) << std::endl;
  std::cout << std::stoull("0100", nullptr, 0) << std::endl;
  std::cout << std::stoull("0x100", nullptr, 0) << std::endl;

  std::cout << std::stoull(L"100", nullptr, 0) << std::endl;
  std::cout << std::stoull(L"0100", nullptr, 0) << std::endl;
  std::cout << std::stoull(L"0x100", nullptr, 0) << std::endl;

  // 2番目の仮引数の使用例
  std::cout << "---- use of idx parameter" << std::endl;

  std::string es = "30%";
  std::size_t ei;
  unsigned long long e = std::stoull(es, &ei);
  std::cout << e << ' ' << es[ei] << std::endl;

  std::wstring ews = L"31%";
  std::size_t ewi;
  unsigned long long ew = std::stoull(ews, &ewi);
  std::cout << ew << ' ' << ewi << std::endl;

  // 文字列先頭に空白がある場合
  std::cout << "---- space character before number" << std::endl;
  std::cout << std::stoull("    1") << std::endl;
  std::cout << std::stoull(L"    2") << std::endl;
}
```

###出力
```
---- base = 10
10
11
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
31 index: 2
---- space character before number
1
2
```

##実装例
```cpp
unsigned long long stoull(const string& str, size_t* idx = nullptr, unsigned long long base = 10) {
  const char* p = str.c_str();
  char* end;
  errno = 0;
  unsigned long long x = strtoull(p, &end, base);
  if (p == end) {
    throw invalid_argument("stoull");
  }
  if (errno == ERANGE) {
    throw out_of_range("stoull");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}

unsigned long long stoull(const wstring& str, size_t* idx = nullptr, unsigned long long base = 10) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  errno = 0;
  unsigned long long x = wcstoull(p, &end, base);
  if (p == end) {
    throw invalid_argument("stoull");
  }
  if (errno == ERANGE) {
    throw out_of_range("stoull");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [GCC, C++11 mode](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0

##参照
- [LWG Issue 2009. Reporting out-of-bound values on numeric string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2009)

### C標準ライブラリに由来する関数
- `atoll`: `stoull`は`atoll`を`std::string`および`std::wsting`に対応させ、戻り値の型を`unsigned long long`に変更したものと見なせる。
- `strtoll`, `wcstoll`: `stoull`は`strtoll`および`wcstoull`をそれぞれ`std::string`と`std::wsting`に対応させたものと見なせる。

### ファミリー
- [`stoi`](./stoi.md): 戻り値の型が`int`となったもの。
- [`stol`](./stol.md): 戻り値の型が`long`となったもの。
- [`stoll`](./stoll.md): 戻り値の型が`long long`となったもの。
- [`stoul`](./stoul.md): 戻り値の型が`unsigned long`となったもの。
- (`stoull`: この関数自身)
- [`stof`](./stof.md): 戻り値の型が`float`となったもの。
- [`stod`](./stod.md): 戻り値の型が`double`となったもの。
- [`stold`](./stold.md): 戻り値の型が`long double`となったもの。
