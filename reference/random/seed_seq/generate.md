#generate(C++11)
```cpp
template <class RandomAccessIterator>
void generate(RandomAccessIterator begin, RandomAccessIterator end);
```

##概要
シード列を生成する。  
この関数は、擬似乱数生成器の、シード列を受け取るコンストラクタおよび`seed()`メンバ関数内で使用される。  
`seed_seq`のコンストラクタで渡されたシード列を元に、32ビット整数の範囲内で偏りがないようにシード値を分布させる。  


##戻り値
以下のアルゴリズムで、シード列の値を分布させる。  
このアルゴリズムは、メルセンヌ・ツイスター法を考案した松本眞氏と西村拓士氏によるシーケンス初期化を、斎藤睦夫氏が改善したものである( 参照：『[An Application of Finite Field: Design and Implementation of 128-bit Instruction-Based Fast Pseudorandom Number Generator](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/SFMT/M062821.pdf)』 )。

- `begin == end`(すなわち生成対象のシード列が空であるなら)何もしない。そうでなければ、
- 出力範囲の各要素を、値`0x8b8b8b8b`で埋める。
- 出力範囲の各要素を、以下のアルゴリズムで変換する。

```cpp
// ループ用変数を定義
auto n = end - begin;
auto s = v.size(); // vは、メンバ変数として保持される、`vector<result_type>`型のシード列オブジェクト
auto m = max(s + 1, n);

// 分布用変数を定義
auto t = (n >= 623) ? 11 : (n >= 68) ? 7 : (n >= 39) ? 5 : (n >= 7) ? 3 : (n - 1) / 2;
auto p = (n - t) / 2;
auto q = p + t;
auto r1 = 1664525 * T(begin[k] ^ begin[k+p] ^ begin[k−1]);
T x = x ^ (x >> 27);

auto r2 = k == 0              ? r1 + s :
          (0 < k) && (k <= s) ? r1 + k % n + v[k-1] :
		  /*k > s ?*/           r1 + k % n;

// 一度目の分布
for (size_t k = 0; k < m; ++k) {
  begin[k+p] += r1;
  begin[k+q] += r2;
  begin[k] = r2;
}

// 二度目の分布用変数を定義
auto r3 = 1566083941 * T(begin[k] + begin[k+p] + begin[k-1]);
r4 = r3 - k % n;

// 二度目の分布
for (size_t k = m; k < m + n; ++k) {
  begin[k+p] ^= r3;
  begin[k+q] ^= r4;
  begin[k] = r4;
}
```

##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::seed_seq seq = {1, 2, 3};

  std::vector<std::uint32_t> seeds(10);
  seq.generate(seeds.begin(), seeds.end());

  for (std::uint32_t x : seeds) {
	std::cout << x << std::endl;
  }
}
```

###出力
```
4069278582
1003217515
3259405872
538510628
148169650
2686142965
4168267496
2286043007
1924303767
770742192
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


