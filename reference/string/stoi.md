#stoi
```cpp
namespace std {
  int stoi(const string& str, size_t* idx = nullptr, int base = 10);
  int stoi(const wstring& str, size_t* idx = nullptr, int base = 10);
}
```

##概要
文字列`str`を数値として読み取って、`int`型の値に変換する。

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

  int a = std::stoi("10"); // std::stoi("10", nullptr, 10);
  std::cout << a << std::endl;

  int aw = std::stoi(L"11"); // std::stoi(L"11", nullptr, 10);
  std::cout << aw << std::endl;

  // 八進法での変換
  std::cout << "---- base = 8" << std::endl;

  int b = std::stoi("10", nullptr, 8);
  std::cout << b << std::endl;

  int bw = std::stoi(L"10", nullptr, 8);
  std::cout << bw << std::endl;

  // 十六進法での変換
  std::cout << "---- base = 16" << std::endl;

  int c = std::stoi("10", nullptr, 16);
  std::cout << c << std::endl;

  int cw = std::stoi(L"11", nullptr, 16);
  std::cout << cw << std::endl;

  // 十六進法での変換（プレフィックス付き）
  int d = std::stoi("0x20", nullptr, 16);
  std::cout << d << std::endl;

  int dw = std::stoi(L"0x21", nullptr, 16);
  std::cout << dw << std::endl;

  // base = 0による十進法・八進法・十六進法の自動判別
  std::cout << "---- base = 0" << std::endl;

  std::cout << std::stoi("100", nullptr, 0) << std::endl;
  std::cout << std::stoi("0100", nullptr, 0) << std::endl;
  std::cout << std::stoi("0x100", nullptr, 0) << std::endl;

  std::cout << std::stoi(L"100", nullptr, 0) << std::endl;
  std::cout << std::stoi(L"0100", nullptr, 0) << std::endl;
  std::cout << std::stoi(L"0x100", nullptr, 0) << std::endl;

  // 2番目の仮引数の使用例
  std::cout << "---- use of idx parameter" << std::endl;

  std::string es = "30%";
  std::size_t ei;
  int e = std::stoi(es, &ei);
  std::cout << e << ' ' << es[ei] << std::endl;

  std::wstring ews = L"31%";
  std::size_t ewi;
  int ew = std::stoi(ews, &ewi);
  std::cout << ew << ' ' << ewi << std::endl;

  // 文字列先頭に空白がある場合
  std::cout << "---- space character before number" << std::endl;
  std::cout << std::stoi("    -1") << std::endl;
  std::cout << std::stoi(L"    -2") << std::endl;
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
int stoi(const string& str, size_t* idx = nullptr, int base = 10) {
  const char* p = str.c_str();
  char* end;
  long x = strtol(p, &end, base);
  if (p == end) {
    throw invalid_argument("stoi");
  }
  if (errno == ERANGE || x < INT_MIN || x > INT_MAX) {
    throw out_of_range("stoi");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return static_cast<int>(x);
}

int stoi(const wstring& str, size_t* idx = nullptr, int base = 10) {
  const wchar_t* p = str.c_str();
  wchar_t* end;
  long x = wcstol(p, &end, base);
  if (p == end) {
    throw invalid_argument("stoi");
  }
  if (errno == ERANGE || x < INT_MIN || x > INT_MAX) {
    throw out_of_range("stoi");
  }
  if (idx != nullptr) {
    *idx = static_cast<std::size_t>(end - p);
  }
  return static_cast<int>(x);
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
- `atoi`: `stoi`は`atoi`を`std::string`および`std::wsting`に対応させたものと見なせる。
- `strtol`, `wcstol`: `stoi`は`strtol`および`wcstol`をそれぞれ`std::string`と`std::wsting`に対応させ、戻り値の型をintに変更したものと見なせる。

### ファミリー
- (`stoi`: この関数自身)
- [`stol`](./stol.md): 戻り値の型が`long`となったもの。
- [`stoll`](./stoll.md): 戻り値の型が`long long`となったもの。
- [`stoul`](./stoul.md): 戻り値の型が`unsgined long`となったもの。
- [`stoull`](./stoull.md): 戻り値の型が`unsgined long long`となったもの。
- [`stof`](./stof.md): 戻り値の型が`float`となったもの。
- [`stod`](./stod.md): 戻り値の型が`double`となったもの。
- [`stold`](./stold.md): 戻り値の型が`long double`となったもの。
