# capacity
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
size_type capacity() const;
```

## 概要
メモリを再確保せずに格納できる最大の要素数を取得する


## 戻り値
メモリの再確保をすることなく保持することができる最大の要素数


## 例
```cpp
#include <iostream>
#include <vector>

int main()
{
    // 確保した領域を確認
    {
        std::vector<int> v;
        v.reserve(3);

        std::size_t cap = v.capacity();
        std::cout << cap << std::endl;
    }

    // 要素を削除しただけでは領域は解放されない
    {
        std::vector<int> v = {3, 1, 4};
        v.erase(v.begin());

        std::size_t cap = v.capacity();
        std::cout << cap << std::endl;
    }
}
```
* capacity[color ff0000]

### 出力
```
3
3
```

