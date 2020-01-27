# bucket
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type bucket(const key_type& k) const;
```

## 概要
指定した�ーと�価な要素が格納されている場合、そのバケットのインデックス（添え�）を取得する。


## 要件
当該コンテナは [`bucket_count`](bucket_count.md)`() > 0` であること


## 戻り値
パラメータ `k` と�価な�ーの要素が格納されているバケットのインデックス（添え�）

戻り値は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲である。


## 計算量
定数。


## 備考
指定した�ーと�価な要素が格納されていない場合、その�ーを挿入した際に [`rehash`](rehash.md) が発生しなければ格納されるバケットのインデックス（添え�）が返る。


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_set>

int main()
{
  std::unordered_multiset<std::string> ums{ "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", };

  decltype(ums)::size_type c = ums.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  // 全ての�ーに対するバケットのインデックスとそのバケットの要素数を取得
  for (decltype(ums)::key_type k : ums) {
    decltype(ums)::size_type b = ums.bucket(k);
    decltype(ums)::size_type s = ums.bucket_size(b);
    std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
  }

  // �在しない�ーに対するバケットのインデックスとそのバケットの要素数を取得
  decltype(ums)::key_type k = "H";
  decltype(ums)::size_type b = ums.bucket(k);
  decltype(ums)::size_type s = ums.bucket_size(b);
  std::cout << "key = " << k << ", bucket = " << b << ", bucket_size = " << s << std::endl;
}
```
* bucket[color ff0000]
* us.bucket_count()[link bucket_count.md]
* us.bucket_size[link bucket_size.md]

### 出力
```
bucket_count() = 11
key = E, bucket = 6, bucket_size = 2
key = E, bucket = 6, bucket_size = 2
key = A, bucket = 5, bucket_size = 6
key = A, bucket = 5, bucket_size = 6
key = C, bucket = 5, bucket_size = 6
key = C, bucket = 5, bucket_size = 6
key = D, bucket = 5, bucket_size = 6
key = D, bucket = 5, bucket_size = 6
key = B, bucket = 7, bucket_size = 2
key = B, bucket = 7, bucket_size = 2
key = H, bucket = 3, bucket_size = 0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

## 関連項目

| 名前 | 説明 |
|----------------------------------------------|----------------------|
| [`max_bucket_count`](max_bucket_count.md)  | 最大バケット数の取得 |

