# reserve
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reserve(size_type n);
```

## 概要
コンテナが、リハッシュされずに少なくとも引数 `n` で指定された要素数格納できるようにバケット数を調整（リハッシュ）する。


## 効果
引数を [`ceil`](/reference/cmath/ceil.md)`(n /` [`max_load_factor`](max_load_factor.md)`())` にした [`rehash`](rehash.md)`()` と等価である。  
( Visual C++ 2012の実装では `n /` [`max_load_factor`](max_load_factor.md)`() + 0.5f` で呼んでいる)


## 戻り値
なし


## 例外
ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


## 計算量
平均的なケースでは [`size`](size.md)`()` に比例するが、最悪のケースでは [`size`](size.md)`()` の 2 乗に比例する。


## 備考
- C++14 までの規格の記載では、要素挿入時のリハッシュ条件に誤りがあったため、効果に記載の処理内容では `n - 1` 要素しか格納することができない場合があった。  
	C++17 でリハッシュ条件が修正され、確実に `n` 要素格納できるようになったが、処理系によっては現在でも `n - 1` 要素しか格納できない可能性があるため、注意が必要である。  
	下記のバージョンの記載も参照のこと。
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
#include <unordered_map>

int main()
{
  std::unordered_multimap<int, int> um;

  um.max_load_factor(2.0F);

  um.emplace(1, 0);
  um.emplace(1, 1);
  um.emplace(2, 2);
  um.emplace(2, 3);

  std::cout << "current max_load_factor: " << um.max_load_factor() << '\n';
  std::cout << "current size: " << um.size() << '\n';
  std::cout << "current bucket_count: " << um.bucket_count() << '\n';
  std::cout << "current load_factor: " << um.load_factor() << '\n';
  std::cout << '\n';

  um.reserve(22);
  std::cout << "um.reserve(22)\n\n";

  std::cout << "new max_load_factor: " << um.max_load_factor() << '\n';
  std::cout << "new size: " << um.size() << '\n';
  std::cout << "new bucket_count: " << um.bucket_count() << '\n';
  std::cout << "new load_factor: " << um.load_factor() << '\n';
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
current bucket_count: 2
current load_factor: 2

um.reserve(22)

new max_load_factor: 2
new size: 4
new bucket_count: 11
new load_factor: 0.363636
```

### 考察
`reserve(22)` により  
[`bucket_count`](bucket_count.md)`() >= n /` [`max_load_factor`](max_load_factor.md)`()` を満たしている

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.5.4 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]

### 備考
- Clang 3.3 以降は C++17 モードでなくても C++17 の条件でのリハッシュとなっている。
- GCC は 8.2.0 時点でまだ C++17 の条件でのリハッシュとなっていない。また、バージョンによってリハッシュ条件が微妙に異なるため注意。


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

## 参照
- [LWG Issue 2156. Unordered containers' reserve(n) reserves for n-1 elements](https://wg21.cmeerw.net/lwg/issue2156)
