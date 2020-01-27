# load_factor
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
float load_factor() const noexcept;
```

## 概要
現在の負荷率（バケットあたりの要素数の平均）を取得する。

## 戻り値
現在の負荷率として、以下を返す：

```cpp
size() / bucket_count()
```
* size()[link size.md]
* bucket_count()[link bucket_count.md]

## 例外
投げない。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,int> um;

  for( int n=0; n<4; n++ )
  {
    um.emplace( n, n );
  }

  std::cout << "current max_load_factor: " << um.max_load_factor() << std::endl;
  std::cout << "current size: " << um.size() << std::endl;
  std::cout << "current bucket_count: " << um.bucket_count() << std::endl;
  std::cout << "current load_factor: " << um.load_factor() << std::endl; // (size / bucket_count)
  std::cout << std::endl;

  return 0;
}
```
* load_factor()[color ff0000]
* um.emplace[link emplace.md]
* um.max_load_factor()[link max_load_factor.md]
* um.size()[link size.md]
* um.bucket_count()[link bucket_count.md]

### 出力例 (Visual C++ 2012)
```
current max_load_factor: 1
current size: 4
current bucket_count: 8
current load_factor: 0.5
```

### 検証
[`load_factor`](load_factor.md) = [`size`](size.md) / [`bucket_count`](bucket_count.md) を満たしている。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012

## 関連項目

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------|-----------------------|
| [`emplace`](emplace.md) | コンテナ内への要素の直接構築 |
| [`size`](size.md) | 要素数の取得 |
| [`bucket_count`](bucket_count.md) | バケット数の取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、�定 |


