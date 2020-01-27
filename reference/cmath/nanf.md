# nan
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  double nan(const char* tagp);
  float nanf(const char* tagp);
  long double nanl(const char* tagp);
}
```

## 概要
文�列から quiet NaN へ変換する。

この関数は、パラメータ`tagp`としてNaNのペイ�ードを受け取る。これは、診�用の付加情報としてユーザーが任意の値をNaNに持たせるものである。


## 効果
- `nan("文�列")`は`strtod("NAN(文�列)", (char**)NULL)`と�価である
- `nan("")`は`strtod("NAN()", (char**)NULL)`と�価である


## 戻り値
シグナルを発生させないNaNを返す。利用可能であれば、`tagp`を通じた内容を付加する。

実装がシグナルを発生させないNaNをサポートしていない場合、ゼ�を返す。


## 例
```cpp example
#include <iostream>
#include <cstring>
#include <cmath>
#include <cstdint>

int main()
{
  // シグナルを発生させないNaNを生成する。ペイ�ードなし
  double result1 = std::nan("");
  // 浮動小数点例外を発生させずにNaN値を持つ変数を整数に変換して出力
  std::uint64_t result1n = 0;
  std::memcpy(&result1n, &result1, sizeof(result1));
  std::cout << result1 << "(" << std::hex << result1n << ")" << std::endl;

  // ペイ�ード付きのシグナルを発生させないNaNを生成する
  double result2 = std::nan("0xF");
  std::uint64_t result2n = 0;
  std::memcpy(&result2n, &result2, sizeof(result2));
  std::cout << result2 << "(" << std::hex << result2n << ")" << std::endl;
}
```
* std::nan[color ff0000]
* std::uint64_t[link /reference/cstdint/uint64_t.md]
* std::memcpy[link /reference/cstring/memcpy.md.nolink]
* std::hex[link /reference/ios/hex.md]

### 出力
```
nan(7ff8000000000000)
nan(7ff800000000000f)
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
