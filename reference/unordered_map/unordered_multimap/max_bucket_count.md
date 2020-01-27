# max_bucket_count
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type max_bucket_count() const noexcept;
```

## 概要
コンテナで格納可能な最大のバケット数を返す。


## 戻り値
コンテナで格納可能な最大のバケット数


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
  std::unordered_multimap<std::string, int> um;

  std::cout << "max bucket count is " << um.max_bucket_count() << std::endl;
}
```
* max_bucket_count()[color ff0000]

### 出力例
```
max bucket count is 576460752303423487
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|----------------------------------------------|------------------|
| [`bucket_count`](bucket_count.md)          | バケット数の取得 |
| [`bucket_size`](bucket_size.md)            | インデックス（添え�）で指定したバケット内の要素数を取得 |
| [`bucket`](bucket.md)                      | �ーで指定したバケットのインデックス（添え�）を取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 |

