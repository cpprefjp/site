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
```cpp example
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
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
