# bucket
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type bucket(const key_type& k) const;
```

## 概要
指定したキーと等価な要素が格納されている場合、そのバケットのインデックス（添え字）を取得する。


## 要件
当該コンテナは [`bucket_count`](bucket_count.md)`() > 0` であること


## 戻り値
パラメータ `k` と等価なキーの要素が格納されているバケットのインデックス（添え字）

戻り値は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲である。


## 計算量
定数。


## 備考
指定したキーと等価な要素が格納されていない場合、そのキーを挿入した際に [`rehash`](rehash.md) が発生しなければ格納されるバケットのインデックス（添え字）が返る。


## 例
```cpp
#include <iostream>
#include <string>
#include <unordered_set>

int main()
{
  std::unordered_set<std::string> us{ "A", "B", "C", "D", "E", };

  decltype(us)::size_type c = us.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全てのキーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(us)::key_type k : us) {
    decltype(us)::size_type b = us.bucket(k);
    decltype(us)::size_type s = us.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // 存在しないキーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(us)::key_type k = "H";
  decltype(us)::size_type b = us.bucket(k);
  decltype(us)::size_type s = us.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
```
* bucket[color ff0000]
* us.bucket_count()[link bucket_count.md]
* us.bucket_size[link bucket_size.md]

### 出力
```
bucket_count() = 5
key = E, bucket = 0, bucket_size = 1
key = D, bucket = 1, bucket_size = 1
key = C, bucket = 4, bucket_size = 2
key = B, bucket = 4, bucket_size = 2
key = A, bucket = 3, bucket_size = 1
key = H, bucket = 2, bucket_size = 0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

## 参照


| | |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| [`max_bucket_count`](max_bucket_count.md) | 最大バケット数の取得 |

