#コンストラクタ (C++11)
```cpp
seed_seq();

template<class T>
seed_seq(initializer_list<T> il);

template<class InputIterator>
seed_seq(InputIterator begin, InputIterator end);
```
* initializer_list[link /reference/initializer_list.md]

##`seed_seq`オブジェクトの構築
- `seed_seq();`

デフォルトコンストラクタ。空のシード列を構築する。


- `template<class T>`<br/>`seed_seq(initializer_list<T> il);`

`seed_seq(il.begin(), il.end())`と同じ。  
  
要件：型`T`は整数型であること。


- `template<class InputIterator>`<br/>`seed_seq(InputIterator begin, InputIterator end);`

以下のアルゴリズムで、シード列を構築する。

```cpp
for (InputIterator s = begin; s != end; ++s) {
  v.push_back((*s) % pow(2, 32)); // 32ビット整数の範囲に収める
}
```

※ `v`は、メンバ変数として保持される、`vector<result_type>`型のシード列オブジェクトである。  
  
要件：`InputIterator`が指す値型が整数型であること。


##例
```cpp
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
  }
  std::cout << std::endl;

  // 初期化子リストによる構築
  {
    std::seed_seq seq = {1, 2, 3};

    std::vector<std::uint32_t> result;
    seq.param(std::back_inserter(result));

    for (std::uint32_t x : result) {
      std::cout << x << ", ";
    }
  }
  std::cout << std::endl;

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
  }
}
```


###出力例
```

1, 2, 3, 
1, 2, 4294967295, 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


