# rehash
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void rehash(size_type n);
```

## 概要
コンテナのバケット数が最小でも引数 `n` で指定された値になるように調整（リハッシュ）する。


## 事後条件
[`bucket_count`](bucket_count.md)`() >=` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` かつ、[`bucket_count`](bucket_count.md)`() >= n`。


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
- 事後条件の前半は、C++14 までは等号が入っていなかったため、最大負荷率の定義と不整合だった。  
	これは規格の誤りとして C++17 で修正されたが、使用する処理系やそのバージョンによっては以前の等号が入らない形で実装されている可能性があるため、注意が必要である。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int, int> um;

  um.max_load_factor(2.0F);

  um.emplace(0, 0);
  um.emplace(1, 1);
  um.emplace(2, 2);
  um.emplace(3, 3);

  std::cout << "current max_load_factor: " << um.max_load_factor() << '\n';
  std::cout << "current size: " << um.size() << '\n';
  std::cout << "current bucket_count: " << um.bucket_count() << '\n';
  std::cout << "current load_factor: " << um.load_factor() << '\n';
  std::cout << '\n';

  um.rehash(11);
  std::cout << "um.rehash(11)\n\n";

  std::cout << "new max_load_factor: " << um.max_load_factor() << '\n';
  std::cout << "new size: " << um.size() << '\n';
  std::cout << "new bucket_count: " << um.bucket_count() << '\n';
  std::cout << "new load_factor: " << um.load_factor() << '\n';
}
```
* rehash[color ff0000]
* um.size()[link size.md]
* um.max_load_factor()[link max_load_factor.md]
* um.load_factor()[link load_factor.md]
* um.bucket_count()[link bucket_count.md]
* um.emplace[link emplace.md]

### 出力例
```
current max_load_factor: 2
current size: 4
current bucket_count: 2
current load_factor: 2

um.rehash(11)

new max_load_factor: 2
new size: 4
new bucket_count: 11
new load_factor: 0.363636
```

### 検証
`rehash(11)` により  
[`bucket_count`](bucket_count.md)`() >= n`  を満たしている

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]

### 備考
- Clang 3.3 以降は C++17 モードでなくても C++17 の条件でのリハッシュとなっている。
- GCC は 8.2.0 時点でまだ C++17 の条件でのリハッシュとなっていない。また、バージョンによってリハッシュ条件が微妙に異なるため注意。


## 関連項目

| 名前 | 説明 |
|-------------------------------------------|--------------|
| [`size`](size.md)                       | 要素数の取得 |
| [`bucket_count`](bucket_count.md)       | バケット数の取得 |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整 |


## 参照
- [LWG Issue 2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)
