#rehash
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void rehash(size_type n);
```

##概要
コンテナのバケット数が最小でも引数 `n` で指定された値になるように調整（リハッシュ）する。


##事後条件
[`bucket_count`](bucket_count.md)`() >` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` かつ、[`bucket_count`](bucket_count.md)`() >= n`。


##戻り値
なし


##例外
ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


##計算量
平均的なケースでは [`size`](size.md)`()` に比例するが、最悪のケースでは [`size`](size.md)`()` の 2 乗に比例する。


##備考
- リハッシュが行われた場合、
	- 全てのイテレータが無効になる。
	- 要素間の順番が変わる。
	- 要素の格納されているバケットが変更になる。
	- 要素へのポインタや参照は無効に**ならない**。
- 現在のバケット数が `n` 以上の場合の動作は、標準では特に規定されていない。
- 標準では、事後条件が [`bucket_count`](bucket_count.md)`() >` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` となっている（等号がない）が、[`load_factor`](load_factor.md)`()`（`=` [`size`](size.md)`() /` [`bucket_count`](bucket_count.md)`()`）の条件は [`max_load_factor`](max_load_factor.md)`() >=` [`load_factor`](load_factor.md)`()` である（等号がある）ため、[`bucket_count`](bucket_count.md)`() >=` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` の（等号がある）方が適切であると思われる。


##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,int> m;

  m.emplace( 0, 0 );
  m.emplace( 1, 1 );
  m.emplace( 2, 2 );
  m.emplace( 3, 3 );

  m.max_load_factor( 2.0f );

  std::cout << "current max_load_factor: " << m.max_load_factor() << std::endl;
  std::cout << "current size: " << m.size() << std::endl;
  std::cout << "current bucket_count: " << m.bucket_count() << std::endl;
  std::cout << "current load_factor: " << m.load_factor() << std::endl;
  std::cout << std::endl;

  m.rehash(20);
  std::cout << "m.rehash(20)" << std::endl;
  std::cout << std::endl;

  std::cout << "new max_load_factor: " << m.max_load_factor() << std::endl; 
  std::cout << "new size: " << m.size() << std::endl;
  std::cout << "new bucket_count: " << m.bucket_count() << std::endl;
  std::cout << "new load_factor: " << m.load_factor() << std::endl;
}
```
* <iostream>[link ../../iostream.md]
* <unordered_map>[link ../../unordered_map.md]
* rehash[color ff0000]
* size[link ./size.md]
* max_load_factor[link ./max_load_factor.md]
* load_factor[link ./load_factor.md]
* bucket_count[link ./bucket_count.md]
* emplace[link emplace.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力例
```
current max_load_factor: 2
current size: 4
current bucket_count: 8
current load_factor: 0.5

m.rehash(20)

new max_load_factor: 2
new size: 4
new bucket_count: 32
new load_factor: 0.125
```

###検証
`rehash(20)` により  
[`bucket_count`](bucket_count.md)`() > n`  を満たしている

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [Clang, C++11 mode](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 11.0

##参照

| | |
|-------------------------------------------|--------------|
| [`size`](size.md)                       | 要素数の取得 |
| [`bucket_count`](bucket_count.md)       | バケット数の取得 |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整 |

