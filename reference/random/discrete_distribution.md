#discrete_distribution(C++11)
```cpp
namespace std{
  template<class IntType = int>
  class discrete_distribution
  {
  public:
    typedef IntType result_type;
    typedef unspecified param_type;

    discrete_distribution();
    template<class InputIterator>
    discrete_distribution(InputIterator firstW, InputIterator lastW);
    discrete_distribution(initializer_list<double> wl);
    template<class UnaryOperation>
    discrete_distribution(size_t nw, double xmin, double xmax, UnaryOperation fw);
    explicit discrete_distribution(const param_type& parm);
    void reset();

    template<class URNG>
    result_type operator()(URNG& g);
    template<class URNG>
    result_type operator()(URNG& g, const param_type& parm);

    vector<double> probabilities() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
  };
}
```

##概要
整数のインデックスごとに離散した確率分布を生成する。


##メンバ関数

| | |
|-----------------------------|-----------------------------------------------------------------------------------------------|
| `(constructor)` | インデックスに対応する確率をパラメータとして与える事もできる。 |
| `reset` | 何もしない。 |
| `operator()` | 乱数生成器をパラメータとして分布に従った擬似乱数を生成する。 |
| `probabilities` | インデックスに対応する確率の数列を得る。 |
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
  typedef std::discrete_distribution<size_t> distribution_type;

  auto s = [seed_size](){
    device_type r;
    std::vector<device_type::result_type> i(seed_size);
    std::generate(i.begin(), i.end(), std::ref(r));
    return std::seed_seq(i.begin(), i.end());
  }();
  engine_type e(s);

  std::array<double, 11>
    values{.0, .1, .2, .3, .4, .5, 1., .9, .8, .7, .6};
  distribution_type d( values.begin() , values.end() );
  
  std::ofstream o("discrete_distribution.tsv");
  for(size_t n = 1000; n; --n)
    o << d(e) << "\t" << "\n";
  o.close();

}catch(const std::exception& e){
  std::cerr << e.what();
}
```


###出力
このプログラムによってある時に得られた結果（;[discrete_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.tsv.7z)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.png) 
![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution-hist.png)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 


