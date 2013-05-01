#capacity
```cpp
size_type capacity() const;
```

##戻り値

メモリーの再確保をすることなく保持することができる最大の要素数

##例

```cpp
<span style='text-indent:0px;background-color:rgb(239,239,255)'><pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><span style='line-height:normal'>#include <iostream>
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
```
* capacity[color ff0000]

    // 要素を削除しただけでは領域は解放されない
    {
        std::vector<int> v = {3, 1, 4};
        v.erase(v.begin());

        std::size_t cap = v.<color=ff0000>capacity</color>();
        std::cout << cap << std::endl;
    }
}</span></code></pre></span>


###出力

```cpp
<pre style='margin:0px;padding:0px'><samp>3</samp></pre><pre style='margin:0px;padding:0px'><samp>3</samp></pre>
```
