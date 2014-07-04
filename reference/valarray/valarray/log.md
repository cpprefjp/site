#log
```cpp
namespace std {
  template <class T>
  valarray<T> log(const valarray<T>& v);
}
```

##概要
自然対数（ネイピア数 e を底とした対数）を得る。log は logarithm（対数）、あるいは、logarithmic function（対数関数）の略。


##戻り値
以下のコードと同等のことを行う：

```cpp
return v.apply(static_cast<T(*)(T)>(std::log));
```
* apply[link ./apply.md]
* log[link /reference/cmath/log.md]


##例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& v)
{
  std::cout << name << " : {";
  bool first = true;

  // 範囲for文で全要素を走査する
  for (const T& x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  const std::valarray<float> v = {0.1f, 0.2f, 0.3f};

  std::valarray<float> exp_result = std::exp(v);
  std::valarray<float> log_result = std::log(exp_result);

  print("exp_result", exp_result);
  print("log_result", log_result);
}
```
* log[color ff0000]

###出力
```
exp_result : {1.10517,1.2214,1.34986}
log_result : {0.1,0.2,0.3}
```


