#param (C++11)
```cpp
template <class OutputIterator>
void param(OutputIterator dest) const;
```

##概要
シード列を取得する。


##効果
32ビット単位になったシード列を、以下の式で`dest`にコピーする。

```cpp
copy(v.begin(), v.end(), dest);
```
* copy[link /reference/algorithm/copy.md]

※ `v`は、メンバ変数として保持される、`vector<result_type>`型のシード列オブジェクトである。  


##戻り値
なし


##例
```cpp
#include <iostream>
#include <random>
#include <vector>
#include <iterator>
#include <limits>

int main()
{
  std::vector<std::uint64_t> seed_data = {
    1,
    2,
    std::numeric_limits<std::uint64_t>::max()
      // 64ビットの最大値を入れる。seed_seqによって32ビット値に変換される。
  };

  std::seed_seq seq(seed_data.begin(), seed_data.end());

  // シード列を取得
  std::vector<std::uint64_t> result;
  seq.param(std::back_inserter(result));

  for (std::uint64_t x : result) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
2
4294967295
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


