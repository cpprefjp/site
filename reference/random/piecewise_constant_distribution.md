#piecewise_constant_distribution(C++11)
```cpp
namespace std{
  template<class RealType = double>
  class piecewise_constant_distribution
  {
  public:
    typedef RealType result_type;
    typedef unspecified param_type;

    piecewise_constant_distribution();
    template<class InputIteratorB, class InputIteratorW>
    piecewise_constant_distribution(InputIteratorB firstB, InputIteratorB lastB, InputIteratorW firstW);
    template<class UnaryOperation>
    piecewise_constant_distribution(initializer_list<RealType> bl, UnaryOperation fw);
    template<class UnaryOperation>
    piecewise_constant_distribution(size_t nw, RealType xmin, RealType xmax, UnaryOperation fw);
    explicit piecewise_constant_distribution(const param_type& parm);

    void reset();

    template<class URNG>
    result_type operator()(URNG& g);
    template<class URNG>
    result_type operator()(URNG& g, const param_type& parm);
    vector<result_type> intervals() const;
    vector<result_type> densities() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
  };
}
```


##概要
区間ごとの重み付けを定数値とした分布を生成する。


##メンバ関数

| | |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `(constructor)` | 区間と重み付けをパラメータで与える事もできる。パラメータを与えない場合は\[0 - 1\]の一様分布となる。 |
| `reset` | 何もしない。 |
| `operator()` | 乱数生成器をパラメータとして分布に従った擬似乱数を生成する。 |
| `intervals` | 区間の数列を得る。 |
| `densities` | 重み付けの数列を得る。 |
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
  typedef std::piecewise_constant_distribution<float> distribution_type;

  auto s = [seed_size](){
    device_type r;
    std::vector<device_type::result_type> i(seed_size);
    std::generate(i.begin(), i.end(), std::ref(r));
    return std::seed_seq(i.begin(), i.end());
  }();
  engine_type e(s);

  std::array<distribution_type::result_type, 7>
    intervals = {.0f, .1f, .2f, .3f, .5f, .7f, 1.f},
    densities = {.3f, .2f, .1f, .0f, 1.f, .2f, 5.f};
  distribution_type d(intervals.begin(), intervals.end(), densities.begin());
  
  std::ofstream o("piecewise_constant_distribution.tsv");
  for(size_t n = 1000; n; --n)
    o << d(e) << "\t" << "\n";
  o.close();

}catch(const std::exception& e){
  std::cerr << e.what();
}
```


###出力
このプログラムによってある時に得られた結果（;[piecewise_constant_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_constant_distribution/piecewise_constant_distribution.tsv.7z)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_constant_distribution/piecewise_constant_distribution.png)

![](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_constant_distribution/piecewise_constant_distribution-hist.png)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3, 4.6.1
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 


