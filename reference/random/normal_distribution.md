#normal_distribution
```cpp
namespace std{
  template<class RealType = double>
  class normal_distribution
  {
  public:
    typedef RealType result_type;
    typedef unspecified param_type;

    explicit normal_distribution(RealType mean = 0.0, RealType stddev = 1.0);
    explicit normal_distribution(const param_type& parm);
    void reset();

    template<class URNG>
    result_type operator()(URNG& g);
    template<class URNG>
    result_type operator()(URNG& g, const param_type& parm);

    RealType mean() const;
    RealType stddev() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
  };
}
```

##概要
正規分布を生成する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal.png)

##メンバ関数

| | |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `(constructor)` | 実数値 `mean` (平均), `stddev` (標準偏差) をパラメータとして与える事ができる。デフォルトは `mean = 0.0` 、 `stddev = 1.0` 。 |
| `reset` | 何もしない。 |
| `operator()` | 乱数生成器をパラメータとして分布に従った擬似乱数を生成する。 |
| `mean` | パラメータ mean を取得する。 |
| `stddev` | パラメータ `stddev` を取得する。 |
| `param` | 分布のパラメータを取得／設定する。 |
| `mix` | 最小値を得る。 |
| `max` | 最大値を得る。 |


##例
```cpp
#include <iostream>
#include <exception>
#include <random>
#include <algorithm>
#include <functional>
#include <array>
#include <fstream>

main()try{
  static const size_t seed_size = 8;
  typedef std::random_device device_type;
  typedef std::mt19937_64 engine_type;
  typedef std::normal_distribution<> distribution_type;

  auto s = [seed_size](){
    device_type r;
    std::vector<device_type::result_type> i(seed_size);
    std::generate(i.begin(), i.end(), std::ref(r));
    return std::seed_seq(i.begin(), i.end());
  }();
  engine_type e(s);

  distribution_type d(3.141592);

  std::ofstream o("normal_distribution.tsv");
  for(size_t n = 256; n; --n)
    o << d(e) << "\t" << "\n";
  o.close();
}catch(const std::exception& e){
  std::cerr << e.what();
}
```

###出力
このプログラムによってある時に得られた結果（[normal_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.tsv.7z)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 

###参考
- [正規分布 - Wikipedia](http://ja.wikipedia.org/wiki/%E6%AD%A3%E8%A6%8F%E5%88%86%E5%B8%83)

