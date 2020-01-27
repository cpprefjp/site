# value
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
int value(char_type ch, int radix) const;
```


## 概要
文�の整数表現を取得する。


## 要件
基数のパラメータ`radix`は、`8`、`10`、`16`のいずれかであること。


## 戻り値
基数`radix`の数�文�`ch`に対応する数値を返す。対応する数値がない場合は`-1`を返す。


## 例
```cpp example
#include <regex>
#include <cassert>

int main()
{
  std::regex_traits<char> traits;

  // 10進数の数�文�'1'の数値表現を取得
  int value = traits.value('1', 10);
  assert(value == 1);
}
```
* value('1', 10)[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

