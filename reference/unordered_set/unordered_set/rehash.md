# rehash
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void rehash(size_type n);
```

## 概要
コンテナのバケット数が最小でも引数 `n` で指定された値になるように調整（リハッシュ）する。


## 事後条件
[`bucket_count`](bucket_count.md)`() >` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` かつ、[`bucket_count`](bucket_count.md)`() >= n`。


## 戻り値
なし


## 例外
ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


## 計算量
平均的なケースでは [`size`](size.md)`()` に比例するが、最悪のケースでは [`size`](size.md)`()` の 2 乗に比例する。


## 備考
- リハッシュが行われた場合、
	- 全てのイテレータが無効になる。
	- 要素間の順番が変わる。
	- 要素の格納されているバケットが変更になる。
	- 要素へのポインタや参照は無効に**ならない**。
- 現在のバケット数が `n` 以上の場合の動作は、標準では特に規定されていない。
- 標準では、事後条件が [`bucket_count`](bucket_count.md)`() >` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` となっている（等号がない）が、[`load_factor`](load_factor.md)`()`（`=` [`size`](size.md)`() /` [`bucket_count`](bucket_count.md)`()`）の条件は [`max_load_factor`](max_load_factor.md)`() >=` [`load_factor`](load_factor.md)`()` である（等号がある）ため、[`bucket_count`](bucket_count.md)`() >=` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` の（等号がある）方が適切であると思われる。


## 例
```cpp
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 2, 3, 4, 5, 6, };

  std::cout << "size is " << us.size() << ", max_load_factor is " << us.max_load_factor() << std::endl;

  std::cout << "bucket_count is " << us.bucket_count() << std::endl;

  // 現在のバケット数より大きな値を指定する。
  us.rehash(100);
  std::cout << "bucket_count is " << us.bucket_count() << std::endl;

  // 現在の要素数 / max_load_factor() よりは大きく、現在のバケット数よりは小さい値を指定する。
  us.rehash(10);
  std::cout << "bucket_count is " << us.bucket_count() << std::endl;

  // 現在の要素数 / max_load_factor() より小さい値を指定する。
  us.rehash(1);
  std::cout << "bucket_count is " << us.bucket_count() << std::endl;
}
```
* <iostream>[link /reference/iostream.md]
* <unordered_set>[link /reference/unordered_set.md]
* rehash[color ff0000]
* unordered_set[link ../unordered_set.md]
* size[link size.md]
* max_load_factor[link max_load_factor.md]
* bucket_count[link bucket_count.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

### 出力例
```
size is 6, max_load_factor is 1
bucket_count is 11
bucket_count is 101
bucket_count is 11
bucket_count is 7
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

## 参照

| | |
|-------------------------------------------|--------------|
| [`size`](size.md)                       | 要素数の取得 |
| [`bucket_count`](bucket_count.md)       | バケット数の取得 |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整 |

