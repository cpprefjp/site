# コンストラクタ
* random[meta header]
* std[meta namespace]
* seed_seq[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
seed_seq();                                       // (1)

template<class T>
seed_seq(initializer_list<T> il);                 // (2)

template<class InputIterator>
seed_seq(InputIterator begin, InputIterator end); // (3)

seed_seq(const seed_seq&) = delete;               // (4)
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : デフォルトコンストラクタ。空のシード列を構築する。
- (2) : `seed_seq(il.begin(), il.end())`と同じ。
- (3) : シード値を要素とするイテレータ範囲から、シード列を構築する
- (4) : コピーコンストラクタ。コピー禁止。これによってムーブも禁止


## 要件
- (2) : 型`T`は整数型であること。
- (3) : `InputIterator`が指す値型が整数型であること。


## 効果
- (1) : 空のシード列を構築する。
- (2) : (3)のオーバーロードに転送する。

    ```cpp
    seed_seq(il.begin(), il.end());
    ```


- (3) : 以下のアルゴリズムで、シード列を構築する。

    ```cpp
    for (InputIterator s = begin; s != end; ++s) {
      v.push_back((*s) % pow(2, 32)); // 32ビット整数の範囲に収める
    }

    // ※ `v`は、メンバ変数として保持される、`vector<result_type>`型のシード列オブジェクトである。
    ```


## 例外
- (1) :
    - C++14 : 投げない


## 例
```cpp example
#include <iostream>
#include <random>
#include <vector>
#include <iterator>
#include <limits>

int main()
{
  // デフォルト構築
  {
    std::seed_seq seq;

    std::vector<std::uint32_t> result;
    seq.param(std::back_inserter(result));

    for (std::uint32_t x : result) {
      std::cout << x << ", ";
    }
    std::cout << std::endl;
  }

  // 初期化子リストによる構築
  {
    std::seed_seq seq = {1, 2, 3};

    std::vector<std::uint32_t> result;
    seq.param(std::back_inserter(result));

    for (std::uint32_t x : result) {
      std::cout << x << ", ";
    }
    std::cout << std::endl;
  }

  // イテレータ範囲による構築
  {
    std::vector<std::uint64_t> seed_data = {
      1,
      2,
      std::numeric_limits<std::uint64_t>::max()
        // 64ビットの最大値を入れる。seed_seqによって32ビット値に変換される。
    };

    std::seed_seq seq(seed_data.begin(), seed_data.end());

    std::vector<std::uint64_t> result;
    seq.param(std::back_inserter(result));

    for (std::uint64_t x : result) {
      std::cout << x << ", ";
    }
    std::cout << std::endl;
  }
}
```
* seq.param[link param.md]
* max()[link /reference/limits/numeric_limits/max.md]
* seed_data.begin()[link /reference/vector/vector/begin.md]
* seed_data.end()[link /reference/vector/vector/end.md]

### 出力
```

1, 2, 3, 
1, 2, 4294967295, 
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2180. Exceptions from `std::seed_seq` operations](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2180)

