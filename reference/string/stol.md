#stol (C++11)
```cpp
namespace std {
  long stol(const string& str, size_t* idx = nullptr, long base = 10);
  long stol(const wstring& str, size_t* idx = nullptr, long base = 10);
}
```

##概要
文字列`str`を数値として読み取って、`long`型の値に変換する。

##効果
それぞれ`std::strtol(str.c_str(), &end, base)`および`std::wcstol(str.c_str(), &end, base)`を呼び出して、その戻り値を返す。

idxが非nullptrの場合、変換に使用されなかった要素のインデックス（`end - str.c_str()`）が格納される。

##戻り値
変換して得られた数値が返される。

##例外
- 数値への変換が行われなかった場合、`std::invalid_argument`が送出される。
- 結果が範囲外の値になった場合、`std::out_of_range`が送出される。

##備考
### errnoの扱い
- Visual C++ 11やGCC (libstdc++) 4.8.2では、この関数を呼び出すと`errno`の値が変更される。
- Clang (libc++) 3.3では、この関数の呼び出し前後で`errno`の値は変化しない。

### グローバルロケールの影響
この関数は、`setlocale`関数により挙動が変化する。
`strtol`関数での文字列先頭の空白を読み飛ばす処理に、`<cctype>`の`isspace`関数が使用されるためである。

##例
```cpp
#include <iostream>
#include <string>

int main()
{
  // 十進法での変換
  std::cout << "---- base = 10" << std::endl;

  long a = std::stol("10"); // std::stol("10", nullptr, 10);
  std::cout << a << std::endl;

  long aw = std::stol(L"11"); // std::stol(L"11", nullptr, 10);
  std::cout << aw << std::endl;

  // 八進法での変換
  std::cout << "---- base = 8" << std::endl;

  long b = std::stol("10", nullptr, 8);
  std::cout << b << std::endl;

  long bw = std::stol(L"10", nullptr, 8);
  std::cout << bw << std::endl;

  // 十六進法での変換
  std::cout << "---- base = 16" << std::endl;

  long c = std::stol("10", nullptr, 16);
  std::cout << c << std::endl;

  long cw = std::stol(L"11", nullptr, 16);
  std::cout << cw << std::endl;

  // 十六進法での変換（プレフィックス付き）
  long d = std::stol("0x20", nullptr, 16);
  std::cout << d << std::endl;

  long dw = std::stol(L"0x21", nullptr, 16);
  std::cout << dw << std::endl;

  // base = 0による十進法・八進法・十六進法の自動判別
  std::cout << "---- base = 0" << std::endl;

  std::cout << std::stol("100", nullptr, 0) << std::endl;
  std::cout << std::stol("0100", nullptr, 0) << std::endl;
  std::cout << std::stol("0x100", nullptr, 0) << std::endl;

  std::cout << std::stol(L"100", nullptr, 0) << std::endl;
  std::cout << std::stol(L"0100", nullptr, 0) << std::endl;
  std::cout << std::stol(L"0x100", nullptr, 0) << std::endl;

  // 2番目の仮引数の使用例
  std::cout << "---- use of idx parameter" << std::endl;

  std::string es = "30%";
  std::size_t ei;
  long e = std::stol(es, &ei);
  std::cout << e << ' ' << es[ei] << std::endl;

  std::wstring ews = L"31%";
  std::size_t ewi;
  long ew = std::stol(ews, &ewi);
  std::cout << ew << ' ' << ewi << std::endl;

  // 文字列先頭に空白がある場合
  std::cout << "---- space character before number" << std::endl;
  std::cout << std::stol("    -1") << std::endl;
  std::cout << std::stol(L"    -2") << std::endl;
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
-1
-2
```

##実装例
```cpp
long stol(const string& str, size_t* idx = nullptr, long base = 10) {
  const char* p = str.c_str();
  char* end;
  errno = 0;
  long x = strtol(p, &end, base);
  if (p == end) {
    throw invalid_argument("stol");
  }
  if (errno == ERANGE) {
    throw out_of_range("stol");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return x;
}

long stol(const wstring& str, size_t* idx = nullptr, long base = 10) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  errno = 0;
  long x = wcstol(p, &end, base);
  if (p == end) {
    throw invalid_argument("stol");
  }
  if (errno == ERANGE) {
    throw out_of_range("stol");
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
- [Clang](/implementation#clang.md): ?
- [GCC](/implementation#gcc.md): ?
- [GCC, C++11 mode](/implementation#gcc.md): ?
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0, 12.0

##参照
### C標準ライブラリに由来する関数
- `atol`: `stol`は`atol`を`std::string`および`std::wsting`に対応させたものと見なせる。
- `strtol`, `wcstol`: `stol`は`strtol`および`wcstol`をそれぞれ`std::string`と`std::wsting`に対応させたものと見なせる。

### ファミリー
- [`stoi`](./stoi.md): 戻り値の型が`int`となったもの。
- (`stol`: この関数自身)
- [`stoll`](./stoll.md): 戻り値の型が`long long`となったもの。
- [`stoul`](./stoul.md): 戻り値の型が`unsgined long`となったもの。
- [`stoull`](./stoull.md): 戻り値の型が`unsgined long long`となったもの。
- [`stof`](./stof.md): 戻り値の型が`float`となったもの。
- [`stod`](./stod.md): 戻り値の型が`double`となったもの。
- [`stold`](./stold.md): 戻り値の型が`long double`となったもの。
