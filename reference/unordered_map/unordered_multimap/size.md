# size
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type size() const noexcept;
```

## 概要
要素数を取得する。


## 戻り値
現在 `unordered_multimap` オブジェクトに格納されている要素の数


## 例外
投げない。


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::unordered_multimap<std::string, int> um{ { "1st", 3 }, { "2nd", 1 }, { "3rd", 4 }, { "4th", 5 }, { "5th", 2 }, };

  // 要素数を出力
  std::cout << um.size() << std::endl;

  // 以下も要素数を出力するが、計算量は定数ではない（線形時間）
  std::cout << std::distance(um.begin(), um.end()) << std::endl;
}
```
* size()[color ff0000]
* std::distance[link /reference/iterator/distance.md]
* um.begin()[link begin.md]
* um.end()[link end.md]

### 出力
```
5
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                          | 説明                               |
|-----------------------------------------------|------------------------------------|
| [`empty`](empty.md)                         | コンテナが空かどうかを判定         |
| [`max_size`](max_size.md)                   | 格納可能な最大の要素数の取得       |
| [`begin`](begin.md)                         | 先頭要素を指すイテレータの取得     |
| [`end`](end.md)                             | 最終要素の次を指すイテレータの取得 |
| [`distance`](/reference/iterator/distance.md) | イテレータ間の距離を求める         |

