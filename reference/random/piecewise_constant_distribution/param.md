#param (C++11)
* random[meta header]
* std[meta namespace]
* piecewise_constant_distribution[meta class]
* function[meta id-type]

```cpp
param_type param() const;
void param(const param_type& parm);
```

##概要
分布のパラメータを設定／取得する。

- `param_type param() const;`

分布のパラメータを返す。

- `void param(const param_type& param);`

分布のパラメータを設定する。

##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  typedef std::piecewise_constant_distribution<> dist_type;

  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};
  dist_type dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  // パラメータを取得
  {
    dist_type::param_type param = dist.param();
  }

  // パラメータを設定
  {
    std::array<double, 3> intervals2 = {0.0, 1.0, 2.0};
    std::array<double, 2> densities2 = {0.2, 8.0};

    dist_type::param_type param(
      intervals2.begin(),
      intervals2.end(),
      densities2.begin()
    );
    dist.param(param);
  }
}
```


###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


