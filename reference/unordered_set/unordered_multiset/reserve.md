# reserve
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reserve(size_type n);
```

## 概要
コンテナが、リハッシュされずに少なくとも引数 `n` で指定された要素数格納できるようにバケット数を調整（リハッシュ）する。（ただし、備考を参照）


## 事後条件
[`bucket_count`](bucket_count.md)`() >` [`size`](size.md)`() /` [`max_load_factor`](max_load_factor.md)`()` かつ、[`bucket_count`](bucket_count.md)`() >=` [`ceil`](/reference/cmath/ceil.md)`(n /` [`max_load_factor`](max_load_factor.md)`())`。


## 戻り値
なし


## 例外
ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


## 計算量
平均的なケースでは [`size`](size.md)`()` に比例するが、最悪のケースでは [`size`](size.md)`()` の 2 乗に比例する。


## 備考
- C++11 : リハッシュされずに引数 `n` で指定された要素数が格納できるように意図されているはずが、 `n - 1` しか格納することができない場合がある（少なくとも、事後条件を満たすだけでは確実に `n` 要素を格納できる保証はない）。
    - この問題については、Issue 「[2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)」を参照。
- C++17 : リハッシュされずに引数 `n` で指定された要素数以上が格納できるようになる。
- リハッシュされる条件については、[`insert`](insert.md)`()`、[`emplace`](emplace.md)`()`、[`emplace_hint`](emplace_hint.md)`()` も参照。
- リハッシュが行われた場合、
    - 全てのイテレータが無効になる。
    - 要素間の順番が変わる。
    - 要素の格納されているバケットが変更になる。
    - 要素へのポインタや参照は無効に**ならない**。
- 現在のバケット数が既に [`ceil`](/reference/cmath/ceil.md)`(n /` [`max_load_factor`](max_load_factor.md)`())` 以上の場合の動作は、標準では特に規定されていない。


## 例
```cpp example
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> ums{ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, };

  std::cout << "size is " << ums.size() << ", max_load_factor is " << ums.max_load_factor() << std::endl;

  std::cout << "bucket_count is " << ums.bucket_count() << std::endl;

  // 現在の要素数より大きな値を指定する。
  ums.reserve(100);
  std::cout << "bucket_count is " << ums.bucket_count() << std::endl;

  // 現在の要素数よりは大きく、現在のバケット数 / max_load_factor() よりは小さい値を指定する。
  ums.reserve(20);
  std::cout << "bucket_count is " << ums.bucket_count() << std::endl;

  // 現在の要素数より小さい値を指定する。
  ums.reserve(1);
  std::cout << "bucket_count is " << ums.bucket_count() << std::endl;
}
```
* reserve[color ff0000]
* ums.size()[link size.md]
* ums.max_load_factor()[link max_load_factor.md]
* ums.bucket_count()[link bucket_count.md]

### 出力例
```
size is 12, max_load_factor is 1
bucket_count is 23
bucket_count is 101
bucket_count is 23
bucket_count is 13
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

| 名前 | 説明 |
|-------------------------------------------|--------------------------------------------------------|
| [`size`](size.md)                       | 要素数の取得 |
| [`bucket_count`](bucket_count.md)       | バケット数の取得 |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整 |
| [`insert`](insert.md)                   | 要素の追加 |
| [`emplace`](emplace.md)                 | コンテナ内への要素の直接構築 |
| [`emplace_hint`](emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |

