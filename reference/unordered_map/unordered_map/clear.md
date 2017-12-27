# clear
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void clear() noexcept;
```

## 概要
コンテナ内のすべての要素を削除する。


## 要件
なし。


## 効果
コンテナ内のすべての要素を削除する。


## 事後条件
[`empty`](empty.md)`() == true`


## 戻り値
なし。


## 例外
投げない。


## 計算量
本関数呼び出し前のコンテナの要素数（[`size`](size.md)`()`）に比例


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<std::string, int> um{ {"1st", 1}, {"2nd", 2}, {"3rd", 3}, {"4th", 4}, {"5th", 5}, };

  std::cout << std::boolalpha;
  std::cout << um.empty() << std::endl;
  um.clear();
  std::cout << um.empty() << std::endl;
}
```
* clear()[color ff0000]
* um.empty()[link empty.md]

### 出力
```
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                | 説明                                                   |
|-------------------------------------|--------------------------------------------------------|
| [`empty`](empty.md)               | コンテナが空かどうかを判定                             |
| [`emplace`](emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)             | 要素の追加                                             |
| [`erase`](erase.md)               | 要素の削除                                             |
| [`swap`](swap.md)                 | 内容の交換                                             |

