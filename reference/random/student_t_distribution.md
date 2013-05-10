#student_t_distribution
```cpp
namespace std{
  template<class RealType = double>
  class student_t_distribution
  {
  public:
    typedef RealType result_type;
    typedef unspecified param_type;

    explicit student_t_distribution(RealType n = 1);
    explicit student_t_distribution(const param_type& parm);
    void reset();

    template<class URNG>
    result_type operator()(URNG& g);
    template<class URNG>
    result_type operator()(URNG& g, const param_type& parm);

    RealType n() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
  };
}
```

##概要

ステューデントのt分布を生成する。

https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t.png

##メンバ関数

| | |
|-----------------------------|------------------------------------------------------------------------------------------------|
|（コンストラクタ）  | 実数値 n をパラメータとして与える事ができる。デフォルトは n = 1 。 |
| reset | 何もしない。 |
| operator() | 乱数生成器をパラメータとして分布に従った擬似乱数を生成する。 |
| n | パラメータ n を取得する。 |
| param | 分布のパラメータを取得／設定する。 |
| mix | 最小値を得る。 |
| max | 最大値を得る。 |



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

}catch(const std::exception& e){
  std::cerr << e.what();
}
```

###出力

このプログラムによってある時に得られた結果（[student_t_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t_distribution.tsv.7z)）を図示する。

<a class='disabled' imageanchor='1' href='/system/errors/NodeNotFound?suri=wuid:gx:2bd42503572e5581.md'>
</a>
https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t_distribution.png

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
- [t分布 - Wikipedia](http://ja.wikipedia.org/wiki/T%E5%88%86%E5%B8%83)
