# reserve
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reserve(size_type n);
```

## 概要
コンテナが、リハッシュされずに少なくとも引数 `n` で指定された要素数格納できるようにバケット数を調整（リハッシュ）する。  
実際には 引数を `n /` [`max_load_factor`](max_load_factor.md)`()` にし [`rehash`](rehash.md)`()` を呼ぶ。  
( VC11の実装では `n /` [`max_load_factor`](max_load_factor.md)`() + 0.5f`   で呼んでいる)

## 戻り値
なし


## 例外
ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


## 計算量
平均的なケースでは [`size`](size.md)`()` に比例するが、最悪のケースでは [`size`](size.md)`()` の 2 乗に比例する。


## 備考
- 本関数は、概要の通り、リハッシュされずに引数 `n` で指定された要素数格納できるように意図されているはずであるが、現在の条件では `n - 1` しか格納することができない場合がある（少なくとも、事後条件を満たすだけでは確実に `n` 要素を格納できる保証はない）。この件については、既に Issue が上がっている（[2156. Unordered containers' reserve(n) reserves for n-1 elements](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#2156)）。リハッシュされる条件については、[`insert`](insert.md)`()`、[`emplace`](emplace.md)`()`、[`emplace_hint`](emplace_hint.md)`()` も参照。
- リハッシュが行われた場合、
	- 全てのイテレータが無効になる。
	- 要素間の順番が変わる。
	- 要素の格納されているバケットが変更になる。
	- 要素へのポインタや参照は無効に**ならない**。
- 現在のバケット数が既に [`ceil`](/reference/cmath/ceil.md)`(n /` [`max_load_factor`](max_load_factor.md)`())` 以上の場合の動作は、標準では特に規定されていない。


## 例
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

  m.reserve(20);
  std::cout << "m.reserve(20)" << std::endl;
  std::cout << std::endl;

  std::cout << "new max_load_factor: " << m.max_load_factor() << std::endl;
  std::cout << "new size: " << m.size() << std::endl;
  std::cout << "new bucket_count: " << m.bucket_count() << std::endl;
  std::cout << "new load_factor: " << m.load_factor() << std::endl;
}
```
* reserve[color ff0000]
* um.size()[link size.md]
* um.max_load_factor()[link max_load_factor.md]
* um.load_factor()[link load_factor.md]
* um.bucket_count()[link bucket_count.md]
* um.emplace[link emplace.md]

### 出力例
```
current max_load_factor: 2
current size: 4
current bucket_count: 8
current load_factor: 0.5

m.reserve(20)

new max_load_factor: 2
new size: 4
new bucket_count: 16
new load_factor: 0.25
```

### 考察
`reserve(20)` により  
[`bucket_count`](bucket_count.md)`() > n /` [`max_load_factor`](max_load_factor.md)`()` を満たしている

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 11.0

## 参照

| | |
|-------------------------------------------|--------------------------------------------------------|
| [`size`](size.md)                       | 要素数の取得 |
| [`bucket_count`](bucket_count.md)       | バケット数の取得 |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`rehash`](reserve.md)                  | 最小バケット数指定によるバケット数の調整 |
| [`insert`](insert.md)                   | 要素の追加 |
| [`emplace`](emplace.md)                 | コンテナ内への要素の直接構築 |
| [`emplace_hint`](emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |

