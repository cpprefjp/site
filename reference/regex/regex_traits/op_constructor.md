# コンストラクタ
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_traits();                              // (1)
regex_traits(const regex_traits&) = default; // (2)
regex_traits(regex_traits&&) = default;      // (3)
```


## 概要
- (1) : デフォルトコンストラクタ。未規定の初期化を行う。
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ


## 例
```cpp
#include <regex>

int main()
{
  std::regex_traits<char> traits;
}
```

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

