#param (C++11)
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

int main()
{
  typedef std::fisher_f_distribution<> dist_type;

  dist_type dist(3.0, 4.0);

  // パラメータを取得
  {
    dist_type::param_type param = dist.param();
  }

  // パラメータを設定
  {
    dist_type::param_type param(3.0, 4.0);
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


