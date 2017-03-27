# max_load_factor
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
float max_load_factor() const noexcept; // (1)
void max_load_factor(float z);          // (2)
```

## 概要
- (1) : 負荷率（バケットあたりの要素数の平均）の最大値を取得する。
- (2) : 負荷率（バケットあたりの要素数の平均）の最大値を設定する。


## 要件
`z` は正の数であること。


## 効果
- (1) : なし。
- (2) : 引数 `z` を「ヒント」として、負荷率（バケットあたりの要素数の平均）の最大値を変更する「かもしれない」。


## 戻り値
- (1) : 負荷率（バケットあたりの要素数の平均）の最大値
- (2) : なし

## 例外
投げない。


## 計算量
定数。


## 備考
- `max_load_factor` の初期値は1.0 である。

- `max_load_factor` はその名前の通り、[`load_factor`](load_factor.md) の最大値（上限）を定義する。  
	従って、[`insert`](insert.md)、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md) で要素が追加された際、および、[`operator=`](op_assign.md) による [`initializer_list`](/reference/initializer_list.md) からの代入で要素数が増加した際には、[`load_factor`](load_factor.md) が `max_load_factor()` 以下になるように、必要に応じてバケット数が調整される。  
	なお、`min_load_factor` のようなものはないので、[`erase`](erase.md) で要素が削除された際にも、バケット数の調整は行われない。  
	（標準では、[`erase`](erase.md) が呼び出された際に、削除された要素を指すイテレータ、および、参照以外は無効にならないと規定されているため、調整できないと思われる）

- (2) の形式では、効果にもある通り引数 `z` は「ヒント」であり、設定も変更される「かもしれない」となっているため、確定的な事は何も無いが、少なくとも [`load_factor`](load_factor.md)`() <= z` が満たされていれば `z` に従って設定されると考えてよいと思われる。  
	一方、[`load_factor`](load_factor.md)`() > z` の場合、単純に無視するか [`load_factor`](load_factor.md)`()` に設定するのが適切と思われるが、`z` をそのまま設定する実装もある。  
	なお、計算量が定数であることからわかるように、いずれの場合でもリハッシュ（バケット数の調整）は行われない（はずだが、[`load_factor`](load_factor.md)`() > z` の場合に [`load_factor`](load_factor.md)`() <= z` を満たすようにリハッシュされる実装も多い）。


## 例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,int> um;

  // バケット数+1個の要素生成。 load_factor > 1.0f になる。
  int c = um.bucket_count() + 1;
  for( int n=0; n<c; n++ )
  {
    um.emplace(n, n);
  }

  std::cout << "current max_load_factor: " << um.max_load_factor() << std::endl;   // (1)
  std::cout << "current size: " << um.size() << std::endl;
  std::cout << "current bucket_count: " << um.bucket_count() << std::endl;
  std::cout << "current load_factor: " << um.load_factor() << std::endl;
  std::cout << std::endl;

  // 初期化
  um.clear();

  // max_load_factor を 上記の load_factor()より大きな値に設定する
  um.max_load_factor((2.5f);                       // (2)
  for( int n=0; n<c; n++ )
  {
    um.emplace(n, n);
  }

  std::cout << "new max_load_factor: " << um.max_load_factor() << std::endl;
  std::cout << "new size: " << um.size() << std::endl;
  std::cout << "new bucket_count: " << um.bucket_count() << std::endl;
  std::cout << "new load_factor: " << um.load_factor() << std::endl;

  return 0;
}
```
* max_load_factor[color ff0000]
* um.load_factor()[link load_factor.md]
* um.size()[link size.md]
* um.bucket_count()[link bucket_count.md]
* um.emplace[link emplace.md]
* um.clear()[link clear.md]

### 出力例(MSVC-11.0)
```
current max_load_factor: 1
current size: 9
current bucket_count: 64
current load_factor: 0.140625

new max_load_factor: 2.5
new size: 9
new bucket_count: 8
new load_factor: 1.125
```

### 検証
[`max_load_factor`](max_load_factor.md) の初期値は 1.0f  

その状態では、[`bucket_count`](bucket_count.md) を超える要素を挿入した場合   
[`load_factor`](load_factor.md) < [`max_load_factor`](max_load_factor.md) になるよう、バケットが拡張されている  

[`max_load_factor`](max_load_factor.md) を 大きくした場合は  
[`load_factor`](load_factor.md) < [`max_load_factor`](max_load_factor.md) を満たすよう  
バケットが縮小された



## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [Clang, C++11 mode](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 11.0

## 参照

| | |
|---------------------------------------|------------|
| [`emplace`](emplace.md) | コンテナ内への要素の直接構築 |
| [`size`](size.md) | 要素数の取得 |
| [`bucket_count`](bucket_count.md) | バケット数の取得 |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、設定 |
| [`clear`](clear.md) | 全要素の削除 |

