# operator()
* random[meta header]
* std[meta namespace]
* geometric_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class URNG>
result_type operator()(URNG& g);                         // (1)

template <class URNG>
result_type operator()(URNG& g, const param_type& parm); // (2)
```

## 概要
- (1) : コンストラクタで指定されたパラメータに基いて、乱数生成を行う
- (2) : コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用して乱数生成を行う


## 戻り値
指定された成功確率に基いて、初めて成功するまでに失敗した回数を返す。


## 計算量
償却定数時間(`g()`の呼び出し回数)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1)
  {
    // 確率0.5で成功する事象を、成功するまで施行する
    std::geometric_distribution<> dist(0.5);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // (2) パラメータを渡すバージョン
  {
    using dist_type = std::geometric_distribution<>;
    dist_type dist;

    // 確率0.5で成功する事象を、成功するまで施行する
    dist_type::param_type param(0.5);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine, param);
    std::cout << result << std::endl;
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

### 出力例
```
2
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2(パラメータを渡さないバージョンのみ)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??

### 備考
GCC 4.8時点のlibstdc++では、パラメータを渡すバージョンの`operator()`呼び出しはコンパイルエラーになる。  
[Bug 58302 - compilation error : `std::negative_binomial_distribution::operator(e, p)`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=58302)  


## 参照


