# max_load_factor
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
float max_load_factor() const noexcept; // (1)
void max_load_factor(float z);          // (2)
```

## 概要
- (1) : 負荷率（バケットあたりの要素数の平均）の最大値を取得する。
- (2) : 負荷率（バケットあたりの要素数の平均）の最大値を�定する。


## 要件
`z` は�の数であること。


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
- `max_load_factor` はその名前の通り、[`load_factor`](load_factor.md) の最大値（上限）を定義する。<br/>従って、[`insert`](insert.md)、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md) で要素が追加された際、および、[`operator=`](op_assign.md) による [`initializer_list`](/reference/initializer_list/initializer_list.md) からの代入で要素数が増加した際には、[`load_factor`](load_factor.md) が `max_load_factor()` 以下になるように、必要に応じてバケット数が調整される。<br/>なお、`min_load_factor` のようなものはないので、[`erase`](erase.md) で要素が削除された際にも、バケット数の調整は行われない。<br/>（標準では、[`erase`](erase.md) が呼び出された際に、削除された要素を指すイテレータ、および、参照以外は無効にならないと規定されているため、調整できないと思われる）

- (2) の形式では、効果にもある通り引数 `z` は「ヒント」であり、�定も変更される「かもしれない」となっているため、確定的な事は何も無いが、少なくとも [`load_factor`](load_factor.md)`() <= z` が満たされていれば `z` に従って�定されると考えてよいと思われる。<br/>一方、[`load_factor`](load_factor.md)`() > z` の場合、単純に無視するか [`load_factor`](load_factor.md)`()` に�定するのが適切と思われるが、`z` をそのまま�定する実装もある。<br/>なお、計算量が定数であることからわかるように、いずれの場合でもリハッシュ（バケット数の調整）は行われない（はずだが、[`load_factor`](load_factor.md)`() > z` の場合に [`load_factor`](load_factor.md)`() <= z` を満たすようにリハッシュされる実装も多い）。


## 例
```cpp example
#include <iostream>
#include <unordered_set>

template<class C>
void print(const C& c)
{
  std::cout << "size is " << c.size() <<
    ", bucket_count is " << c.bucket_count() <<
    ", load_factor is " << c.load_factor() <<
    ", bucket_count * max_load_factor is " << static_cast<float>(c.bucket_count()) * c.max_load_factor() << '\n' << std::endl;
}

int main()
{
  std::unordered_set<int> us(12);

  std::cout << "max_load_factor is " << us.max_load_factor() << "\n\n"; // (1) の形式。max_load_factor のデフォルトは 1.0f。
  print(us);

  us.max_load_factor(2.0f); // (2) の形式。max_load_factor を 2.0f に�定。

  float z = us.max_load_factor(); // (1) の形式。上記で�定した値。
  std::cout << "max_load_factor is " << z << "\n\n";
  print(us);

  decltype(us)::size_type b = us.bucket_count();
  float limit = static_cast<float>(b) * z;

  // max_load_factor を超えるちょっと前まで要素を追加。
  decltype(us)::size_type i = 1;
  for (; i < limit; ++i) {
    us.emplace(i);
  }

  // max_load_factor を超えて bucket_count が変わるまで、状態を出力しつつ要素を追加。
  for (; us.bucket_count() == b; ++i) {
    print(us);
    us.emplace(i);
  }

  // bucket_count が変わった直後の状態を出力。
  print(us);

  us.max_load_factor(us.load_factor() / 2.0f); // (2) の形式。max_load_factor を現在の値の 1/2 を引数にして呼び出し。

  z = us.max_load_factor(); // (1) の形式。上記で�定した値。
  std::cout << "max_load_factor is " << z << "\n\n";

  // 最終的な状態を出力。
  print(us);
}
```
* max_load_factor[color ff0000]
* size()[link size.md]
* bucket_count()[link bucket_count.md]
* load_factor()[link load_factor.md]
* us.emplace[link emplace.md]

### 出力
libstdc++ の出力例（4.7.2 時点）

- [`load_factor`](load_factor.md)`() > z` の場合に、`max_load_factor()` に `z` を�定して [`load_factor`](load_factor.md)`() < max_load_factor()` となるようにリハッシュされている。

- [`size`](size.md)`() = 0` の場合にバケット数が減っている。

- [`emplace`](emplace.md)`()` では、[`load_factor`](load_factor.md)`()` が `max_load_factor()` に達する前にバケット数が増加している。

```
max_load_factor is 1

size is 0, bucket_count is 29, load_factor is 0, bucket_count * max_load_factor is 29

max_load_factor is 2

size is 0, bucket_count is 2, load_factor is 0, bucket_count * max_load_factor is 4

size is 3, bucket_count is 2, load_factor is 1.5, bucket_count * max_load_factor is 4

size is 4, bucket_count is 7, load_factor is 0.571429, bucket_count * max_load_factor is 14

max_load_factor is 0.285714

size is 4, bucket_count is 29, load_factor is 0.137931, bucket_count * max_load_factor is 8.28572

```

libc++ の出力例（2012/12/19 現在）

- [`load_factor`](load_factor.md)`() > z` の場合に、`max_load_factor()` に [`load_factor`](load_factor.md)`()` の値を�定してリハッシュはされていない。

- [`size`](size.md)`() = 0` の場合にもバケット数は減っていない。

- [`emplace`](emplace.md)`()` では、[`load_factor`](load_factor.md)`()` が `max_load_factor()` を超えた際にバケット数が増加している。

```
max_load_factor is 1

size is 0, bucket_count is 13, load_factor is 0, bucket_count * max_load_factor is 13

max_load_factor is 2

size is 0, bucket_count is 13, load_factor is 0, bucket_count * max_load_factor is 26

size is 25, bucket_count is 13, load_factor is 1.92308, bucket_count * max_load_factor is 26

size is 26, bucket_count is 13, load_factor is 2, bucket_count * max_load_factor is 26

size is 27, bucket_count is 29, load_factor is 0.931035, bucket_count * max_load_factor is 58

max_load_factor is 0.931035

size is 27, bucket_count is 29, load_factor is 0.931035, bucket_count * max_load_factor is 27

```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|---------------------------------------|------------|
| [`operator=`](op_assign.md)         | 代入演算� |
| [`emplace`](emplace.md)             | コンテナ内への要素の直接構築 |
| [`emplace_hint`](emplace_hint.md)   | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)               | 要素の追加 |
| [`size`](size.md)                   | 要素数の取得 |
| [`bucket_count`](bucket_count.md)   | バケット数の取得 |
| [`load_factor`](load_factor.md)     | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`rehash`](rehash.md)               | 最小バケット数指定によるバケット数の調整 |
| [`reserve`](reserve.md)             | 最小要素数指定によるバケット数の調整 |

